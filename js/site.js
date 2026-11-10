// Man Studio site: renders the pages from content (site/live in Firebase, or the starting content),
// in English or Hebrew, with a theme that changes with the season/event.
import { DEFAULT_SITE } from './content.js';
import * as fb from './fb.js';

const $ = (s, r = document) => r.querySelector(s);
export const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clone = o => JSON.parse(JSON.stringify(o));

export const S = {
  site: clone(DEFAULT_SITE),
  live: null,               // what visitors see (for the admin: the published version)
  lang: (() => { try { return localStorage.getItem('ms.lang') || (/^he/i.test(navigator.language) ? 'he' : 'en'); } catch (e) { return 'en'; } })(),
  page: 'home',
  lb: null, lbErr: '', media: {}, mine: null, memberCode: undefined
};
export const hooks = { decorate: null, after: null };   // filled by admin.js

export const t = v => v == null ? '' : typeof v === 'string' ? v : (v[S.lang] || v.en || v.he || '');
const L = (en, he) => S.lang === 'he' ? he : en;

// small markdown: **bold**, [text](url), blank line = paragraph
export function md(s) {
  return esc(s || '').split(/\n{2,}/).map(p => '<p>' + p
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
    .replace(/\[([^\]]+)\]\(((?:https?:\/\/|#\/)[^)\s]+)\)/g, (m, a, u) => `<a href="${u}"${u.startsWith('#') ? '' : ' target="_blank" rel="noopener"'}>${a}</a>`)
    .replace(/\n/g, '<br>') + '</p>').join('');
}
// pictures: a URL, or "media:<id>" uploaded by the admin (kept in site/media)
export function img(src) {
  if (!src) return '';
  if (!src.startsWith('media:')) return src;
  const id = src.slice(6);
  if (S.media[id]) return S.media[id];
  if (S.media[id] === undefined) {
    S.media[id] = null;
    fb.get('site/media/' + id).then(d => { if (d) { S.media[id] = d; render(); } }).catch(() => {});
  }
  return 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
}
const link = u => !u ? '' : u.startsWith('#') ? `href="${esc(u)}"` : `href="${esc(u)}" target="_blank" rel="noopener"`;

/* ---------------- theme ---------------- */
export const PRESETS = {
  neon: { name: { en: 'Neon', he: 'ניאון' } },
  halloween: { name: { en: 'Halloween', he: 'האלווין' } },
  winter: { name: { en: 'Winter', he: 'חורף' } },
  summer: { name: { en: 'Summer', he: 'קיץ' } },
  zone: { name: { en: 'THE ZONE (music)', he: 'THE ZONE (מוזיקה)' } },
  glitch: { name: { en: 'Glitch Storm', he: 'Glitch Storm' } }
};
export function activePreset(theme) {
  theme = theme || {};
  if (theme.mode && theme.mode !== 'auto' && PRESETS[theme.mode]) return theme.mode;
  const now = new Date(), md_ = String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
  for (const s of theme.schedule || []) {
    const inRange = s.from <= s.to ? md_ >= s.from && md_ <= s.to : md_ >= s.from || md_ <= s.to;   // ranges over New Year
    if (inRange && PRESETS[s.preset]) return s.preset;
  }
  return PRESETS[theme.preset] ? theme.preset : 'neon';
}
function applyTheme() {
  const th = S.site.theme || {};
  document.documentElement.dataset.theme = activePreset(th);
  let st = $('#custom-css');
  if (!st) { st = document.createElement('style'); st.id = 'custom-css'; document.head.appendChild(st); }
  st.textContent = th.css || '';
}

/* ---------------- blocks ---------------- */
export const RENDER = {
  hero: b => `<section class="hero">${b.image ? `<div class="hero-bg" style="background-image:url('${esc(img(b.image))}')"></div>` : ''}
    <div class="hero-in">${b.icon ? `<div class="hero-ic">${esc(b.icon)}</div>` : ''}<h1 class="glow">${esc(t(b.title))}</h1>${t(b.subtitle) ? `<p class="lead">${esc(t(b.subtitle))}</p>` : ''}
    ${(b.buttons || []).filter(x => x.url).length ? `<div class="btns">${b.buttons.filter(x => x.url).map(x => `<a class="btn ${x.style === 'ghost' ? 'ghost' : 'pri'}" ${link(x.url)}>${esc(t(x.label))}</a>`).join('')}</div>` : ''}</div></section>`,
  text: b => `<section class="blk txt">${t(b.title) ? `<h2>${esc(t(b.title))}</h2>` : ''}<div class="md">${md(t(b.body))}</div></section>`,
  image: b => b.src ? `<section class="blk ${b.wide ? 'wide' : ''}"><figure class="pic"><img src="${esc(img(b.src))}" alt="${esc(t(b.caption))}" loading="lazy">${t(b.caption) ? `<figcaption>${esc(t(b.caption))}</figcaption>` : ''}</figure></section>` : '',
  cards: b => `<section class="blk">${t(b.title) ? `<h2>${esc(t(b.title))}</h2>` : ''}<div class="cards">${(b.items || []).map(c => `<a class="card${c.soon ? ' soon' : ''}" ${link(c.url)}>
      <div class="card-img">${c.image ? `<img src="${esc(img(c.image))}" alt="" loading="lazy">` : `<span class="card-ic">${esc(c.icon || '★')}</span>`}${t(c.badge) ? `<span class="badge">${esc(t(c.badge))}</span>` : ''}</div>
      <div class="card-b"><b>${esc(t(c.title))}</b>${t(c.text) ? `<span>${esc(t(c.text))}</span>` : ''}</div></a>`).join('')}</div></section>`,
  buttons: b => `<section class="blk"><div class="btns center">${(b.items || []).filter(x => x.url).map(x => `<a class="btn ${x.style === 'ghost' ? 'ghost' : 'pri'}" ${link(x.url)}>${esc(t(x.label))}</a>`).join('')}</div></section>`,
  countdown: b => `<section class="blk"><div class="count" data-date="${esc(b.date)}">${t(b.title) ? `<h2>${esc(t(b.title))}</h2>` : ''}<div class="cd"><span><b data-u="d">-</b>${L('days', 'ימים')}</span><span><b data-u="h">-</b>${L('hours', 'שעות')}</span><span><b data-u="m">-</b>${L('min', 'דקות')}</span><span><b data-u="s">-</b>${L('sec', 'שניות')}</span></div>
    <p class="cd-when">${esc(fmtDate(b.date))}</p>${t(b.text) ? `<p>${esc(t(b.text))}</p>` : ''}${b.url ? `<a class="btn pri sm" ${link(b.url)}>${L('More', 'עוד פרטים')}</a>` : ''}</div></section>`,
  news: b => {
    const items = newsList().slice(0, b.count || 5);
    return `<section class="blk">${t(b.title) ? `<h2>${esc(t(b.title))}</h2>` : ''}${items.length ? `<div class="news">${items.map(([id, n]) => `<article class="post" id="n-${esc(id)}">${n.image ? `<img src="${esc(img(n.image))}" alt="" loading="lazy">` : ''}<div><time>${esc(fmtDay(n.date))}</time><h3>${esc(t(n.title))}</h3><div class="md">${md(t(n.body))}</div>${n.url ? `<a class="more" ${link(n.url)}>${L('Read more', 'לקריאה')} →</a>` : ''}</div></article>`).join('')}</div>` : `<p class="muted">${L('No news yet.', 'עוד אין חדשות.')}</p>`}</section>`;
  },
  leaderboard: b => `<section class="blk">${t(b.title) ? `<h2>${esc(t(b.title))}</h2>` : ''}${lbHTML(b.count || 10)}</section>`,
  video: b => { const id = ytId(b.url); return id ? `<section class="blk"><div class="vid"><iframe src="https://www.youtube-nocookie.com/embed/${esc(id)}" title="video" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div></section>` : ''; },
  html: b => b.code ? `<section class="blk"><iframe class="htmlbox" sandbox="allow-scripts allow-popups" srcdoc="${esc(b.code)}" style="height:${+b.height || 300}px"></iframe></section>` : '',
  spacer: b => `<div style="height:${+b.size || 40}px"></div>`,
  stats: () => statsHTML()
};
const ytId = u => { const m = /(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{6,})/.exec(u || ''); return m && m[1]; };
const fmtDate = iso => { try { return new Date(iso).toLocaleString(S.lang === 'he' ? 'he-IL' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch (e) { return iso; } };
const fmtDay = d => { try { return new Date(d).toLocaleDateString(S.lang === 'he' ? 'he-IL' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }); } catch (e) { return d; } };
export const newsList = () => Object.entries(S.site.news || {}).sort((a, b) => (b[1].pinned ? 1 : 0) - (a[1].pinned ? 1 : 0) || String(b[1].date).localeCompare(String(a[1].date)));

/* ---------------- leaderboard & my stats ---------------- */
function loadLB() {
  if (S.lb || S.lbLoading) return;
  S.lbLoading = true;
  fb.get('ranked').catch(e => fb.user() ? fb.get('ranked', true) : Promise.reject(e))
    .then(d => { S.lb = Object.entries(d || {}).map(([uid, v]) => Object.assign({ uid }, v)).filter(v => v && v.name).sort((a, b) => (b.rp || 0) - (a.rp || 0) || (b.score || 0) - (a.score || 0)); })
    .catch(e => { S.lbErr = e.code === 'DENIED' ? 'denied' : 'offline'; S.lb = []; })
    .finally(() => { S.lbLoading = false; render(); });
}
function lbHTML(n) {
  if (!S.lb) { loadLB(); return `<div class="loading">${L('Loading…', 'טוען…')}</div>`; }
  if (!S.lb.length) return `<p class="muted">${S.lbErr === 'denied' ? L('The leaderboard opens soon.', 'טבלת השיאים תיפתח בקרוב.') : L('No players yet.', 'עוד אין שחקנים.')}</p>`;
  const me = fb.user();
  return `<ol class="lb">${S.lb.slice(0, n).map((p, i) => `<li class="${me && me.uid === p.uid ? 'me' : ''}"><span class="rk r${i + 1}">${i + 1}</span><span class="nm">${esc(p.name)}</span><span class="rp">${(p.rp || 0).toLocaleString()} RP</span><span class="sc">${(p.score || 0).toLocaleString()}</span></li>`).join('')}</ol>`;
}
function statsHTML() {
  const me = fb.user();
  if (!me) return `<section class="blk center"><h2>${L('Your stats', 'הסטטיסטיקות שלך')}</h2><p class="muted">${L('Sign in with your Color Under Pressure account.', 'התחברו עם המשתמש של Color Under Pressure.')}</p><button class="btn pri" data-a="signin">${L('Sign in', 'התחברות')}</button></section>`;
  if (!S.lb) { loadLB(); return `<div class="loading">${L('Loading…', 'טוען…')}</div>`; }
  const i = S.lb.findIndex(p => p.uid === me.uid), p = S.lb[i];
  if (S.memberCode === undefined) { S.memberCode = null; fb.get('site_member', true).then(d => { S.memberCode = d || null; render(); }).catch(() => {}); }
  const mc = S.memberCode && S.memberCode.code;
  return `<section class="blk center"><h2>${L('Hi', 'היי')} ${esc(p ? p.name : me.name)}!</h2>
    ${p ? `<div class="stats"><div><b>#${i + 1}</b><span>${L('Rank', 'מקום')}</span></div><div><b>${(p.rp || 0).toLocaleString()}</b><span>RP</span></div><div><b>${(p.score || 0).toLocaleString()}</b><span>${L('Best score', 'שיא')}</span></div><div><b>${S.lb.length}</b><span>${L('Players', 'שחקנים')}</span></div></div>
      ${p.ts ? `<p class="muted">${L('Last ranked game', 'משחק דירוג אחרון')}: ${esc(fmtDay(p.ts * 1000))}</p>` : ''}`
    : `<p class="muted">${L('No ranked games yet. Play Ranked in Color Under Pressure to get on the board!', 'עוד אין משחקי דירוג. שחקו Ranked ב-Color Under Pressure כדי להיכנס לטבלה!')}</p>`}
    ${mc ? `<div class="member"><span>${esc(t(S.memberCode.note) || L('Members-only code', 'קוד למחוברים בלבד'))}</span><code>${esc(mc)}</code></div>` : ''}
    <button class="btn ghost sm" data-a="signout">${L('Sign out', 'התנתקות')}</button></section>`;
}

/* ---------------- page ---------------- */
export function render() {
  applyTheme();
  const site = S.site, pages = site.pages || {};
  if (!pages[S.page]) S.page = pages.home ? 'home' : Object.keys(pages)[0];
  const pg = pages[S.page] || { blocks: [] };
  document.documentElement.lang = S.lang; document.documentElement.dir = S.lang === 'he' ? 'rtl' : 'ltr';
  document.title = (S.page === 'home' ? '' : t(pg.title) + ' · ') + 'Man Studio';
  const me = fb.user();
  $('#top').innerHTML = `<a class="logo" href="#/home"><span class="logo-m">M</span><span>MAN STUDIO</span></a>
    <nav id="nav">${(site.nav || []).filter(id => pages[id]).map(id => `<a href="#/${esc(id)}" class="${id === S.page ? 'on' : ''}">${esc(t(pages[id].title))}</a>`).join('')}</nav>
    <div class="top-r"><button class="lang" data-a="lang" aria-label="language">${S.lang === 'he' ? 'EN' : 'עב'}</button>
    ${me ? `<a class="btn ghost sm" href="#/me">${esc(me.name)}</a>` : `<button class="btn pri sm" data-a="signin">${L('Sign in', 'התחברות')}</button>`}
    <button class="burger" data-a="menu" aria-label="menu">☰</button></div>`;
  $('#main').innerHTML = (pg.blocks || []).map((b, i) => `<div class="b" data-i="${i}">${(RENDER[b.type] || (() => ''))(b)}</div>`).join('') || `<section class="blk center"><p class="muted">${L('This page is empty.', 'הדף הזה ריק.')}</p></section>`;
  $('#foot').innerHTML = `<div class="soc">${(site.socials || []).map(s => `<a ${link(s.url)}>${esc(s.name)}</a>`).join('')}</div><p>© ${new Date().getFullYear()} Man Studio</p>`;
  tickCountdowns();
  if (hooks.decorate) hooks.decorate();
}
function tickCountdowns() {
  document.querySelectorAll('.count[data-date]').forEach(el => {
    const ms = new Date(el.dataset.date) - Date.now();
    const v = ms > 0 ? { d: Math.floor(ms / 864e5), h: Math.floor(ms / 36e5) % 24, m: Math.floor(ms / 6e4) % 60, s: Math.floor(ms / 1e3) % 60 } : { d: 0, h: 0, m: 0, s: 0 };
    Object.entries(v).forEach(([k, n]) => { const b = el.querySelector(`[data-u="${k}"]`); if (b) b.textContent = n; });
    el.classList.toggle('live', ms <= 0);
  });
}
setInterval(tickCountdowns, 1000);

/* ---------------- sign in ---------------- */
export function modal(html, onMount) {
  const m = $('#modal');
  m.innerHTML = `<div class="scrim" data-a="close"></div><div class="box" role="dialog" aria-modal="true">${html}</div>`;
  m.hidden = false; document.body.classList.add('noscroll');
  if (onMount) onMount(m.querySelector('.box'));
  const f = m.querySelector('[autofocus]'); if (f) setTimeout(() => f.focus(), 30);
  return m.querySelector('.box');
}
export function closeModal() { const m = $('#modal'); m.hidden = true; m.innerHTML = ''; document.body.classList.remove('noscroll'); }
export function toast(msg, bad) {
  const el = $('#toast'); el.textContent = msg; el.className = 'toast show' + (bad ? ' bad' : '');
  clearTimeout(toast.t); toast.t = setTimeout(() => { el.className = 'toast'; }, 2800);
}
function signInForm() {
  modal(`<h2>${L('Sign in', 'התחברות')}</h2><p class="muted">${L('Use your Color Under Pressure account.', 'עם המשתמש של Color Under Pressure.')}</p>
    <form id="si"><label>${L('Username', 'שם משתמש')}<input name="n" autocomplete="username" required autofocus></label>
    <label>${L('Password', 'סיסמה')}<input name="p" type="password" autocomplete="current-password" required></label>
    <p class="err" id="si-err"></p><div class="row"><button type="button" class="btn ghost" data-a="close">${L('Cancel', 'ביטול')}</button><button class="btn pri">${L('Sign in', 'התחברות')}</button></div></form>`, box => {
    box.querySelector('#si').onsubmit = async e => {
      e.preventDefault();
      const f = e.target, err = box.querySelector('#si-err'), btn = f.querySelector('.btn.pri');
      btn.disabled = true; err.textContent = '';
      try {
        await fb.signIn(f.n.value, f.p.value);
        closeModal(); S.memberCode = undefined; toast(L('Signed in', 'התחברת'));
        if (fb.isAdmin()) await startAdmin(); else location.hash = '#/me';
        render();
      } catch (x) {
        err.textContent = /INVALID|PASSWORD|EMAIL_NOT_FOUND|USER/.test(x.code || '') ? L('Wrong username or password', 'שם משתמש או סיסמה שגויים')
          : x.code === 'TOO_MANY_ATTEMPTS_TRY_LATER' ? L('Too many tries. Wait a bit.', 'יותר מדי ניסיונות. חכו קצת.') : L('Could not connect. Try again.', 'אין חיבור. נסו שוב.');
      } finally { btn.disabled = false; }
    };
  });
}

async function startAdmin() {
  if (!fb.isAdmin()) return;
  const A = await import('./admin.js');
  await A.start();
}

/* ---------------- actions ---------------- */
document.addEventListener('click', e => {
  const a = e.target.closest('[data-a]'); if (!a) return;
  const k = a.dataset.a;
  if (k === 'lang') { S.lang = S.lang === 'he' ? 'en' : 'he'; try { localStorage.setItem('ms.lang', S.lang); } catch (x) {} render(); }
  if (k === 'signin') signInForm();
  if (k === 'signout') { fb.signOut(); S.memberCode = undefined; document.documentElement.classList.remove('admin'); location.hash = '#/home'; location.reload(); }
  if (k === 'close') closeModal();
  if (k === 'menu') document.body.classList.toggle('menu-open');
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#modal').hidden) closeModal(); });

function route() {
  const id = decodeURIComponent((location.hash.match(/^#\/([^?#]*)/) || [])[1] || 'home');
  S.page = id; document.body.classList.remove('menu-open');
  render(); window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);

/* ---------------- start ---------------- */
(async function boot() {
  try {
    const live = await fb.get('site/live');
    if (live && live.pages) S.site = live;
  } catch (e) { console.warn('site/live', e.message); }
  S.live = clone(S.site);
  route();
  if (fb.isAdmin()) startAdmin().then(render).catch(e => console.error(e));
})();
