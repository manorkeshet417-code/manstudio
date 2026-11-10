// The admin editor. Loaded only for the studio account; the database rules are what actually allow the writes.
// Changes go to a draft (site_draft, saved automatically). "Publish" copies the draft to site/live for everyone.
import * as fb from './fb.js';
import { S, render, hooks, t, esc, modal, closeModal, toast, PRESETS, activePreset, img } from './site.js';

const $ = (s, r = document) => r.querySelector(s);
const clone = o => JSON.parse(JSON.stringify(o));
const L = (en, he) => S.lang === 'he' ? he : en;
let editing = false, dirty = false, saveT = null, status = '';

/* ---------------- block types: what each one has ---------------- */
const T = 'i18n', A = 'i18narea';
const BTN = [['label', T, 'Text'], ['url', 'url', 'Link (https://… or #/page)'], ['style', 'select', 'Style', ['primary', 'ghost']]];
export const SCHEMA = {
  hero: { name: 'Hero (big title)', fields: [['kicker', T, 'Small line above the title'], ['title', T, 'Title'], ['subtitle', A, 'Subtitle'], ['image', 'image', 'Background image'], ['cover', 'image', 'Cover picture on the side (optional)'], ['icon', 'text', 'Icon (emoji, optional)'], ['chips', 'list', 'Tags (Windows, Free…)', [['en', 'text', 'English'], ['he', 'text', 'עברית']]], ['buttons', 'list', 'Buttons', BTN]] },
  gallery: { name: 'Screenshots gallery', fields: [['title', T, 'Title'], ['images', 'imglist', 'Pictures']] },
  features: { name: 'Features (icon + title + text)', fields: [['title', T, 'Title'], ['items', 'list', 'Features', [['icon', 'text', 'Icon (emoji)'], ['title', T, 'Title'], ['text', A, 'Text']]]] },
  info: { name: 'Game details table', fields: [['title', T, 'Title'], ['rows', 'list', 'Rows', [['label', T, 'Label'], ['value', T, 'Value']]]] },
  timeline: { name: 'Timeline / roadmap', fields: [['title', T, 'Title'], ['items', 'list', 'Steps', [['date', 'text', 'Date (YYYY-MM-DD)'], ['when', T, 'Date text (optional, instead)'], ['title', T, 'Title'], ['text', A, 'Text'], ['url', 'url', 'Link (optional)']]]] },
  faq: { name: 'Questions & answers', fields: [['title', T, 'Title'], ['items', 'list', 'Questions', [['q', T, 'Question'], ['a', A, 'Answer']]]] },
  numbers: { name: 'Big numbers', fields: [['items', 'list', 'Numbers', [['value', T, 'Number'], ['label', T, 'Label']]]] },
  split: { name: 'Picture + text', fields: [['kicker', T, 'Small line'], ['title', T, 'Title'], ['body', A, 'Text'], ['image', 'image', 'Picture'], ['flip', 'check', 'Picture on the other side'], ['url', 'url', 'Button link (optional)'], ['label', T, 'Button text']] },
  text: { name: 'Text', fields: [['kicker', T, 'Small line (optional)'], ['title', T, 'Title (optional)'], ['body', A, 'Text: **bold**, [link](https://…), blank line = new paragraph']] },
  image: { name: 'Image', fields: [['src', 'image', 'Image'], ['caption', T, 'Caption'], ['wide', 'check', 'Full width']] },
  cards: { name: 'Cards (games, links…)', fields: [['title', T, 'Title (optional)'], ['items', 'list', 'Cards', [['title', T, 'Title'], ['text', A, 'Text'], ['image', 'image', 'Image'], ['icon', 'text', 'Icon if no image (emoji)'], ['badge', T, 'Badge'], ['url', 'url', 'Link (https://… or #/page)'], ['soon', 'check', 'Coming soon (dimmed)']]]] },
  buttons: { name: 'Buttons', fields: [['items', 'list', 'Buttons', BTN]] },
  countdown: { name: 'Countdown', fields: [['title', T, 'Title'], ['date', 'datetime', 'Date and time (your time)'], ['text', A, 'Text'], ['url', 'url', 'Link (optional)']] },
  news: { name: 'Latest news', fields: [['title', T, 'Title'], ['count', 'number', 'How many']] },
  leaderboard: { name: 'Leaderboard (Ranked)', fields: [['title', T, 'Title'], ['count', 'number', 'How many players']] },
  video: { name: 'YouTube video', fields: [['url', 'url', 'YouTube link']] },
  html: { name: 'Custom HTML (advanced)', fields: [['code', 'code', 'HTML / CSS / JS (runs in a safe box)'], ['height', 'number', 'Height (px)']] },
  spacer: { name: 'Space', fields: [['size', 'number', 'Height (px)']] },
  stats: { name: 'Player stats (sign-in)', fields: [] }
};
const NEW_BLOCK = {
  hero: () => ({ type: 'hero', title: { en: 'NEW TITLE', he: 'כותרת חדשה' }, subtitle: { en: '', he: '' }, buttons: [] }),
  text: () => ({ type: 'text', title: { en: '', he: '' }, body: { en: 'Write something…', he: 'כתבו משהו…' } }),
  image: () => ({ type: 'image', src: '', caption: { en: '', he: '' } }),
  cards: () => ({ type: 'cards', title: { en: '', he: '' }, items: [{ title: { en: 'Card', he: 'כרטיס' }, text: { en: '', he: '' }, image: '', url: '' }] }),
  buttons: () => ({ type: 'buttons', items: [{ label: { en: 'Button', he: 'כפתור' }, url: '#/home', style: 'primary' }] }),
  countdown: () => ({ type: 'countdown', title: { en: 'Countdown', he: 'ספירה לאחור' }, date: new Date(Date.now() + 7 * 864e5).toISOString(), text: { en: '', he: '' } }),
  news: () => ({ type: 'news', title: { en: 'News', he: 'חדשות' }, count: 3 }),
  leaderboard: () => ({ type: 'leaderboard', title: { en: 'Leaderboard', he: 'שיאים' }, count: 10 }),
  video: () => ({ type: 'video', url: '' }),
  html: () => ({ type: 'html', code: '<h1 style="color:#fff;font-family:sans-serif">Hello!</h1>', height: 200 }),
  spacer: () => ({ type: 'spacer', size: 40 }),
  gallery: () => ({ type: 'gallery', title: { en: 'Screenshots', he: 'צילומי מסך' }, images: [] }),
  features: () => ({ type: 'features', title: { en: 'Features', he: 'מה יש במשחק' }, items: [{ icon: '⚡', title: { en: 'Feature', he: 'פיצ׳ר' }, text: { en: '', he: '' } }] }),
  info: () => ({ type: 'info', title: { en: 'Details', he: 'פרטים' }, rows: [{ label: { en: 'Platforms', he: 'פלטפורמות' }, value: { en: 'Windows', he: 'Windows' } }] }),
  timeline: () => ({ type: 'timeline', title: { en: 'Roadmap', he: 'מה הלאה' }, items: [{ date: new Date().toISOString().slice(0, 10), title: { en: 'Step', he: 'שלב' }, text: { en: '', he: '' } }] }),
  faq: () => ({ type: 'faq', title: { en: 'Questions', he: 'שאלות' }, items: [{ q: { en: 'Question?', he: 'שאלה?' }, a: { en: 'Answer.', he: 'תשובה.' } }] }),
  numbers: () => ({ type: 'numbers', items: [{ value: { en: '10', he: '10' }, label: { en: 'Games', he: 'משחקים' } }] }),
  split: () => ({ type: 'split', title: { en: 'Title', he: 'כותרת' }, body: { en: 'Text', he: 'טקסט' }, image: '' }),
  stats: () => ({ type: 'stats' })
};

/* ---------------- draft, save, publish ---------------- */
export async function start() {
  if (!fb.isAdmin()) return;
  document.documentElement.classList.add('admin');
  try {
    const d = await fb.get('site_draft', true);
    if (d && d.pages && (d.version || 1) >= (S.site.version || 1)) S.site = d;
    status = d && d.pages && S.site === d ? L('Draft loaded', 'הטיוטה נטענה') : (S.live && (S.live.version || 1) < (S.site.version || 1) ? L('New content version: check it and Publish', 'גרסת תוכן חדשה: בדקו ופרסמו') : '');
  } catch (e) { status = L('Draft not reachable (rules?)', 'אין גישה לטיוטה (חוקים?)'); }
  hooks.decorate = decorate;
  bar();
}
function changed() {
  dirty = true; status = L('Saving draft…', 'שומר טיוטה…'); bar();
  clearTimeout(saveT);
  saveT = setTimeout(async () => {
    try { await fb.put('site_draft', S.site); status = L('Draft saved · not published yet', 'הטיוטה נשמרה · עוד לא פורסם'); }
    catch (e) { status = L('Could not save the draft', 'שמירת הטיוטה נכשלה'); toast(status, true); }
    bar();
  }, 700);
  render();
}
async function publish() {
  clearTimeout(saveT);
  const b = $('#ab-pub'); if (b) b.disabled = true;
  try {
    S.site.updatedAt = Date.now();
    await fb.put('site/live', S.site);
    await fb.put('site_draft', S.site);
    S.live = clone(S.site); dirty = false;
    status = L('Published! Everyone sees it now', 'פורסם! כולם רואים את זה עכשיו'); toast(status);
  } catch (e) { status = L('Publish failed: ', 'הפרסום נכשל: ') + e.message; toast(status, true); }
  bar();
}
async function discard() {
  if (!confirm(L('Throw away the draft and go back to what is published?', 'למחוק את הטיוטה ולחזור למה שמפורסם?'))) return;
  S.site = clone(S.live); dirty = false;
  try { await fb.put('site_draft', S.site); } catch (e) {}
  status = L('Back to the published version', 'חזרה לגרסה המפורסמת'); render(); bar();
}

/* ---------------- the admin bar ---------------- */
function bar() {
  let el = $('#adminbar');
  if (!el) { el = document.createElement('div'); el.id = 'adminbar'; document.body.appendChild(el); }
  el.innerHTML = `<b class="ab-t">ADMIN</b>
    <button data-x="edit" class="${editing ? 'on' : ''}">✏️ ${editing ? L('Editing', 'עריכה פעילה') : L('Edit page', 'עריכת הדף')}</button>
    <button data-x="pages">📄 ${L('Pages', 'דפים')}</button><button data-x="news">📰 ${L('News', 'חדשות')}</button>
    <button data-x="theme">🎨 ${L('Design', 'עיצוב')}</button><button data-x="member">⭐ ${L('Members', 'מחוברים')}</button><button data-x="adv">⚙️</button>
    <span class="ab-s">${esc(status)}</span>
    <button data-x="discard" class="ghost">↺ ${L('Discard', 'ביטול שינויים')}</button><button id="ab-pub" data-x="publish" class="pub">⬆ ${L('Publish', 'פרסום')}</button>`;
}
document.addEventListener('click', e => {
  const x = e.target.closest('[data-x]'); if (!x || !fb.isAdmin()) return;
  const k = x.dataset.x;
  if (k === 'edit') { editing = !editing; render(); bar(); }
  if (k === 'publish') publish();
  if (k === 'discard') discard();
  if (k === 'pages') pagesPanel();
  if (k === 'news') newsPanel();
  if (k === 'theme') themePanel();
  if (k === 'member') memberPanel();
  if (k === 'adv') advancedPanel();
  // block toolbar
  const pg = S.site.pages[S.page];
  if (k.startsWith('b-') && pg) {
    const i = +x.dataset.i, bl = pg.blocks;
    if (k === 'b-edit') blockForm(i);
    if (k === 'b-up' && i > 0) { [bl[i - 1], bl[i]] = [bl[i], bl[i - 1]]; changed(); }
    if (k === 'b-down' && i < bl.length - 1) { [bl[i + 1], bl[i]] = [bl[i], bl[i + 1]]; changed(); }
    if (k === 'b-dup') { bl.splice(i + 1, 0, clone(bl[i])); changed(); }
    if (k === 'b-del' && confirm(L('Delete this block?', 'למחוק את הבלוק?'))) { bl.splice(i, 1); changed(); }
    if (k === 'b-add') addBlock(i + 1);
  }
});

/* ---------------- edit mode on the page ---------------- */
function decorate() {
  document.documentElement.classList.toggle('editing', editing);
  if (!editing) return;
  const main = $('#main'), pg = S.site.pages[S.page];
  if (!pg) return;
  if (!pg.blocks || !pg.blocks.length) main.innerHTML = '';
  main.querySelectorAll('.b').forEach(el => {
    const i = +el.dataset.i, b = pg.blocks[i];
    const tb = document.createElement('div'); tb.className = 'etb';
    tb.innerHTML = `<span>${esc((SCHEMA[b.type] || { name: b.type }).name)}</span><button data-x="b-edit" data-i="${i}">✎ ${L('Edit', 'עריכה')}</button><button data-x="b-up" data-i="${i}" title="up">▲</button><button data-x="b-down" data-i="${i}" title="down">▼</button><button data-x="b-dup" data-i="${i}" title="copy">⧉</button><button data-x="b-del" data-i="${i}" title="delete">🗑</button><button data-x="b-add" data-i="${i}">＋ ${L('Block below', 'בלוק מתחת')}</button>`;
    el.prepend(tb);
  });
  const add = document.createElement('div'); add.className = 'eadd';
  add.innerHTML = `<button data-x="b-add" data-i="${(pg.blocks || []).length - 1}">＋ ${L('Add a block', 'הוספת בלוק')}</button>`;
  main.appendChild(add);
}
function addBlock(at) {
  modal(`<h2>${L('Add a block', 'הוספת בלוק')}</h2><div class="pick">${Object.entries(SCHEMA).map(([k, s]) => `<button data-k="${k}">${esc(s.name)}</button>`).join('')}</div><div class="row"><button class="btn ghost" data-a="close">${L('Cancel', 'ביטול')}</button></div>`, box => {
    box.querySelectorAll('[data-k]').forEach(b => b.onclick = () => {
      const pg = S.site.pages[S.page]; pg.blocks = pg.blocks || [];
      pg.blocks.splice(Math.max(0, at), 0, NEW_BLOCK[b.dataset.k]()); closeModal(); changed();
      setTimeout(() => blockForm(Math.max(0, at)), 50);
    });
  });
}

/* ---------------- forms built from the block's fields ---------------- */
const getP = (o, p) => p.split('.').reduce((a, k) => a == null ? a : a[k], o);
function setP(o, p, v) { const ks = p.split('.'); const last = ks.pop(); const tgt = ks.reduce((a, k) => (a[k] = a[k] == null ? (/^\d+$/.test(k) ? [] : {}) : a[k]), o); tgt[last] = v; }
function fieldsHTML(fields, obj, base) {
  return fields.map(([key, type, label, extra]) => {
    const p = base ? base + '.' + key : key, v = getP(obj, p);
    if (type === T || type === A) {
      const tag = type === A ? 'textarea' : 'input';
      const one = (lg, nm) => tag === 'textarea' ? `<textarea data-p="${p}.${lg}" rows="4" dir="${lg === 'he' ? 'rtl' : 'ltr'}" placeholder="${nm}">${esc(v && typeof v === 'object' ? v[lg] || '' : lg === 'en' ? v || '' : '')}</textarea>` : `<input data-p="${p}.${lg}" dir="${lg === 'he' ? 'rtl' : 'ltr'}" placeholder="${nm}" value="${esc(v && typeof v === 'object' ? v[lg] || '' : lg === 'en' ? v || '' : '')}">`;
      return `<div class="fld"><label>${esc(label || key)}</label><div class="two">${one('en', 'English')}${one('he', 'עברית')}</div></div>`;
    }
    if (type === 'text' || type === 'url') return `<div class="fld"><label>${esc(label || key)}</label><input data-p="${p}" dir="ltr" value="${esc(v || '')}"></div>`;
    if (type === 'number') return `<div class="fld"><label>${esc(label || key)}</label><input type="number" data-p="${p}" data-num="1" value="${esc(v == null ? '' : v)}"></div>`;
    if (type === 'check') return `<label class="chk"><input type="checkbox" data-p="${p}" data-chk="1" ${v ? 'checked' : ''}> ${esc(label || key)}</label>`;
    if (type === 'select') return `<div class="fld"><label>${esc(label || key)}</label><select data-p="${p}">${extra.map(o => `<option ${o === v ? 'selected' : ''}>${o}</option>`).join('')}</select></div>`;
    if (type === 'code') return `<div class="fld"><label>${esc(label || key)}</label><textarea data-p="${p}" rows="10" dir="ltr" class="mono">${esc(v || '')}</textarea></div>`;
    if (type === 'datetime') { const d = v ? new Date(v) : new Date(); const loc = new Date(d - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 16); return `<div class="fld"><label>${esc(label || key)}</label><input type="datetime-local" data-p="${p}" data-dt="1" value="${loc}"></div>`; }
    if (type === 'image') return `<div class="fld"><label>${esc(label || key)}</label><div class="imgf">${v ? `<img src="${esc(img(v))}" alt="">` : ''}<input data-p="${p}" dir="ltr" placeholder="https://… ${L('or upload', 'או העלאה')}" value="${esc(v || '')}"><button type="button" class="btn ghost sm" data-up="${p}">⬆ ${L('Upload', 'העלאה')}</button></div></div>`;
    if (type === 'imglist') {
      const arr = Array.isArray(v) ? v : [];
      return `<div class="fld"><label>${esc(label || key)}</label><div class="imgs">${arr.map((src, i) => `<div class="imgs-i"><img src="${esc(img(src))}" alt=""><button type="button" data-ldel="${p}" data-li="${i}">🗑</button></div>`).join('')}</div><div class="row" style="justify-content:flex-start"><button type="button" class="btn ghost sm" data-upadd="${p}">⬆ ${L('Upload a picture', 'העלאת תמונה')}</button><input data-urladd="${p}" dir="ltr" placeholder="${L('or paste a picture link and press Enter', 'או הדביקו קישור לתמונה ולחצו Enter')}"></div></div>`;
    }
    if (type === 'list') {
      const arr = Array.isArray(v) ? v : [];
      return `<div class="fld"><label>${esc(label || key)}</label>${arr.map((_, i) => `<fieldset><div class="lt"><b>${i + 1}</b><button type="button" data-lup="${p}" data-li="${i}">▲</button><button type="button" data-ldn="${p}" data-li="${i}">▼</button><button type="button" data-ldel="${p}" data-li="${i}">🗑</button></div>${fieldsHTML(extra, obj, p + '.' + i)}</fieldset>`).join('')}<button type="button" class="btn ghost sm" data-ladd="${p}">＋ ${L('Add', 'הוספה')}</button></div>`;
    }
    return '';
  }).join('');
}
// a form for any object with a field list; onSave gets the edited copy
function form(title, fields, obj, onSave, extraHTML) {
  const work = clone(obj);
  const draw = () => {
    const box = modal(`<h2>${esc(title)}</h2><form id="ef" class="ef">${fieldsHTML(fields, work)}${extraHTML || ''}<div class="row"><button type="button" class="btn ghost" data-a="close">${L('Cancel', 'ביטול')}</button><button class="btn pri">${L('Done', 'סיום')}</button></div></form>`);
    const f = box.querySelector('#ef');
    f.addEventListener('input', e => {
      const el = e.target, p = el.dataset.p; if (!p) return;
      setP(work, p, el.dataset.chk ? el.checked : el.dataset.num ? (el.value === '' ? null : +el.value) : el.dataset.dt ? new Date(el.value).toISOString() : el.value);
    });
    f.addEventListener('change', e => { const el = e.target; if (el.dataset.chk) setP(work, el.dataset.p, el.checked); });
    f.addEventListener('click', async e => {
      const b = e.target.closest('button'); if (!b) return;
      const listOp = (attr, fn) => { if (b.dataset[attr] !== undefined) { const p = b.dataset[attr], arr = getP(work, p) || []; fn(arr, +b.dataset.li); setP(work, p, arr); draw(); return true; } };
      const sub = fields.find(([k]) => b.dataset.ladd === k || (b.dataset.ladd || '').endsWith('.' + k));
      if (listOp('ladd', arr => arr.push(sub && sub[3] ? Object.fromEntries(sub[3].map(([k, ty]) => [k, ty === T || ty === A ? { en: '', he: '' } : ty === 'check' ? false : ''])) : {}))) return;
      if (listOp('lup', (arr, i) => { if (i > 0) [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; })) return;
      if (listOp('ldn', (arr, i) => { if (i < arr.length - 1) [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]]; })) return;
      if (listOp('ldel', (arr, i) => arr.splice(i, 1))) return;
      if (b.dataset.up) { const v = await uploadImage(); if (v) { setP(work, b.dataset.up, v); draw(); } }
      if (b.dataset.upadd) { const v = await uploadImage(); if (v) { const arr = getP(work, b.dataset.upadd) || []; arr.push(v); setP(work, b.dataset.upadd, arr); draw(); } }
    });
    f.addEventListener('keydown', e => {
      const el = e.target; if (e.key !== 'Enter' || !el.dataset || !el.dataset.urladd) return;
      e.preventDefault(); const u = el.value.trim(); if (!/^https?:\/\//.test(u)) return;
      const arr = getP(work, el.dataset.urladd) || []; arr.push(u); setP(work, el.dataset.urladd, arr); draw();
    });
    f.onsubmit = e => { e.preventDefault(); onSave(work); closeModal(); };
  };
  draw();
}
function blockForm(i) {
  const pg = S.site.pages[S.page], b = pg.blocks[i], sc = SCHEMA[b.type];
  if (!sc || !sc.fields.length) { toast(L('Nothing to set in this block', 'אין מה להגדיר בבלוק הזה')); return; }
  form(sc.name, sc.fields, b, w => { pg.blocks[i] = w; changed(); });
}

/* ---------------- images: resized in the browser, kept in site/media ---------------- */
function uploadImage() {
  return new Promise(res => {
    const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*';
    inp.onchange = async () => {
      const file = inp.files[0]; if (!file) return res(null);
      try {
        const bmp = await createImageBitmap(file), max = 1400, k = Math.min(1, max / Math.max(bmp.width, bmp.height));
        const c = document.createElement('canvas'); c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
        c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
        const data = c.toDataURL('image/jpeg', 0.82), id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
        toast(L('Uploading…', 'מעלה…'));
        await fb.put('site/media/' + id, data); S.media[id] = data; toast(L('Image uploaded', 'התמונה עלתה'));
        res('media:' + id);
      } catch (e) { toast(L('Upload failed', 'ההעלאה נכשלה'), true); res(null); }
    };
    inp.click();
  });
}

/* ---------------- pages ---------------- */
function pagesPanel() {
  const site = S.site, ids = Object.keys(site.pages);
  const nav = site.nav || [];
  const order = nav.filter(id => site.pages[id]).concat(ids.filter(id => !nav.includes(id)));
  modal(`<h2>${L('Pages', 'דפים')}</h2><p class="muted">${L('Pages in the menu appear in this order. Pages not in the menu are reached by links (#/page-name).', 'דפים בתפריט מופיעים בסדר הזה. לדפים שלא בתפריט מגיעים דרך קישורים (#/שם-הדף).')}</p>
    <div class="plist">${order.map(id => { const p = site.pages[id]; return `<div class="prow"><div class="pt"><b>${esc(t(p.title))}</b><code>#/${esc(id)}</code></div>
      <label class="chk"><input type="checkbox" data-nav="${esc(id)}" ${nav.includes(id) ? 'checked' : ''}> ${L('Menu', 'בתפריט')}</label>
      <button data-pup="${esc(id)}">▲</button><button data-pdn="${esc(id)}">▼</button><button data-pren="${esc(id)}">✎</button><button data-pgo="${esc(id)}">${L('Open', 'פתיחה')}</button>${id !== 'home' ? `<button data-pdel="${esc(id)}">🗑</button>` : ''}</div>`; }).join('')}</div>
    <form id="np" class="ef"><h3>${L('New page', 'דף חדש')}</h3><div class="two"><input name="en" placeholder="Title (English)" required><input name="he" dir="rtl" placeholder="כותרת (עברית)"></div><input name="id" dir="ltr" placeholder="page-address (a-z, 0-9, -)" pattern="[a-z0-9-]{2,40}" required><label class="chk"><input type="checkbox" name="nav" checked> ${L('Show in menu', 'להציג בתפריט')}</label><div class="row"><button type="button" class="btn ghost" data-a="close">${L('Close', 'סגירה')}</button><button class="btn pri">＋ ${L('Create page', 'יצירת דף')}</button></div></form>`, box => {
    const re = () => { closeModal(); pagesPanel(); };
    box.querySelectorAll('[data-nav]').forEach(c => c.onchange = () => { const id = c.dataset.nav; site.nav = c.checked ? (site.nav || []).concat(id) : (site.nav || []).filter(x => x !== id); site.pages[id].hidden = !c.checked; changed(); });
    const move = (id, d) => { const n = site.nav || []; const i = n.indexOf(id); if (i < 0 || i + d < 0 || i + d >= n.length) return; [n[i], n[i + d]] = [n[i + d], n[i]]; site.nav = n; changed(); re(); };
    box.querySelectorAll('[data-pup]').forEach(b => b.onclick = () => move(b.dataset.pup, -1));
    box.querySelectorAll('[data-pdn]').forEach(b => b.onclick = () => move(b.dataset.pdn, 1));
    box.querySelectorAll('[data-pgo]').forEach(b => b.onclick = () => { closeModal(); location.hash = '#/' + b.dataset.pgo; });
    box.querySelectorAll('[data-pren]').forEach(b => b.onclick = () => { const id = b.dataset.pren; form(L('Page title', 'כותרת הדף'), [['title', T, L('Title', 'כותרת')]], site.pages[id], w => { site.pages[id].title = w.title; changed(); }); });
    box.querySelectorAll('[data-pdel]').forEach(b => b.onclick = () => { const id = b.dataset.pdel; if (!confirm(L('Delete the page "', 'למחוק את הדף "') + t(site.pages[id].title) + '"?')) return; delete site.pages[id]; site.nav = (site.nav || []).filter(x => x !== id); changed(); re(); });
    box.querySelector('#np').onsubmit = e => {
      e.preventDefault(); const f = e.target, id = f.id.value.trim();
      if (site.pages[id]) { toast(L('That address is taken', 'הכתובת תפוסה'), true); return; }
      site.pages[id] = { title: { en: f.en.value.trim(), he: f.he.value.trim() || f.en.value.trim() }, blocks: [NEW_BLOCK.hero(), NEW_BLOCK.text()] };
      site.pages[id].blocks[0].title = { en: f.en.value.trim().toUpperCase(), he: f.he.value.trim() || f.en.value.trim() };
      if (f.nav.checked) site.nav = (site.nav || []).concat(id); else site.pages[id].hidden = true;
      changed(); closeModal(); editing = true; location.hash = '#/' + id; bar();
    };
  });
}

/* ---------------- news ---------------- */
const NEWS_FIELDS = [['title', T, 'Title'], ['body', A, 'Text'], ['image', 'image', 'Image (optional)'], ['date', 'text', 'Date (YYYY-MM-DD)'], ['url', 'url', 'Link (optional)'], ['pinned', 'check', 'Pin to the top']];
function newsPanel() {
  const news = S.site.news = S.site.news || {};
  const list = Object.entries(news).sort((a, b) => String(b[1].date).localeCompare(String(a[1].date)));
  modal(`<h2>${L('News', 'חדשות')}</h2><div class="plist">${list.map(([id, n]) => `<div class="prow"><div class="pt"><b>${n.pinned ? '📌 ' : ''}${esc(t(n.title))}</b><code>${esc(n.date)}</code></div><button data-ne="${esc(id)}">✎</button><button data-nd="${esc(id)}">🗑</button></div>`).join('') || `<p class="muted">${L('No news yet', 'עוד אין חדשות')}</p>`}</div>
    <div class="row"><button class="btn ghost" data-a="close">${L('Close', 'סגירה')}</button><button class="btn pri" id="nn">＋ ${L('New post', 'פוסט חדש')}</button></div>`, box => {
    const edit = id => form(L('News post', 'פוסט חדשות'), NEWS_FIELDS, news[id] || { title: { en: '', he: '' }, body: { en: '', he: '' }, date: new Date().toISOString().slice(0, 10) }, w => { news[id] = w; changed(); setTimeout(newsPanel, 60); });
    box.querySelectorAll('[data-ne]').forEach(b => b.onclick = () => edit(b.dataset.ne));
    box.querySelectorAll('[data-nd]').forEach(b => b.onclick = () => { if (confirm(L('Delete this post?', 'למחוק את הפוסט?'))) { delete news[b.dataset.nd]; changed(); closeModal(); newsPanel(); } });
    box.querySelector('#nn').onclick = () => edit('n' + Date.now().toString(36));
  });
}

/* ---------------- design: theme, event calendar, custom CSS, links ---------------- */
function themePanel() {
  const th = S.site.theme = S.site.theme || { mode: 'auto', preset: 'neon', schedule: [] };
  const presets = Object.keys(PRESETS);
  form(L('Design', 'עיצוב'), [
    ['mode', 'select', L('Theme now ("auto" = by the calendar)', 'ערכת נושא ("auto" = לפי לוח האירועים)'), ['auto'].concat(presets)],
    ['preset', 'select', L('Default theme (when no event)', 'ברירת מחדל (כשאין אירוע)'), presets],
    ['schedule', 'list', L('Event calendar (MM-DD)', 'לוח אירועים (חודש-יום)'), [['preset', 'select', 'Theme', presets], ['from', 'text', 'From (MM-DD)'], ['to', 'text', 'To (MM-DD)']]],
    ['css', 'code', L('Custom CSS (advanced, changes the whole site)', 'CSS מותאם (מתקדם, משנה את כל האתר)')]
  ], th, w => { S.site.theme = w; changed(); toast(L('Theme now: ', 'ערכת הנושא עכשיו: ') + t(PRESETS[activePreset(w)].name)); },
  `<p class="muted">${L('Themes: ', 'ערכות: ')}${presets.map(p => esc(p + ' = ' + t(PRESETS[p].name))).join(' · ')}</p>`);
}
function memberPanel() {
  const cur = { code: '', note: { en: '', he: '' } };
  fb.get('site_member', true).then(d => {
    form(L('Members-only code', 'קוד למחוברים בלבד'), [['code', 'text', L('Code (empty = none)', 'קוד (ריק = אין)')], ['note', T, L('Text above the code', 'טקסט מעל הקוד')]], d || cur, async w => {
      try { await fb.put('site_member', w.code ? w : null); S.memberCode = undefined; toast(L('Saved (live right away)', 'נשמר (פעיל מיד)')); render(); }
      catch (e) { toast(L('Save failed', 'השמירה נכשלה'), true); }
    }, `<p class="muted">${L('Only signed-in players see it, on their stats page. This saves immediately (no Publish needed).', 'רק שחקנים מחוברים רואים אותו, בדף הסטטיסטיקות. נשמר מיד (בלי פרסום).')}</p>`);
  }).catch(() => toast(L('No access (rules?)', 'אין גישה (חוקים?)'), true));
}
function advancedPanel() {
  modal(`<h2>${L('Advanced', 'מתקדם')}</h2>
    <p class="muted">${L('The whole site as JSON. Copy it as a backup, or paste a changed version and apply it to the draft.', 'כל האתר כ-JSON. אפשר להעתיק כגיבוי, או להדביק גרסה ששונתה ולהחיל על הטיוטה.')}</p>
    <textarea id="js" class="mono" rows="14" dir="ltr">${esc(JSON.stringify(S.site, null, 2))}</textarea>
    <div class="fld"><label>${L('Footer links', 'קישורים בתחתית')}</label><button class="btn ghost sm" id="soc">✎ ${L('Edit links', 'עריכת קישורים')}</button></div>
    <div class="row"><button class="btn ghost" data-a="close">${L('Close', 'סגירה')}</button><button class="btn ghost" id="dl">⬇ ${L('Download backup', 'הורדת גיבוי')}</button><button class="btn pri" id="ap">${L('Apply to draft', 'החלה על הטיוטה')}</button></div>
    <p class="muted"><button class="linkbtn" data-a="signout">${L('Sign out', 'התנתקות')}</button></p>`, box => {
    box.querySelector('#ap').onclick = () => { try { const v = JSON.parse(box.querySelector('#js').value); if (!v.pages) throw new Error('pages'); S.site = v; changed(); closeModal(); toast(L('Applied to the draft', 'הוחל על הטיוטה')); } catch (e) { toast(L('Not valid JSON: ', 'JSON לא תקין: ') + e.message, true); } };
    box.querySelector('#dl').onclick = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(S.site, null, 2)], { type: 'application/json' })); a.download = 'manstudio-site-' + new Date().toISOString().slice(0, 10) + '.json'; a.click(); };
    box.querySelector('#soc').onclick = () => form(L('Footer links', 'קישורים בתחתית'), [['socials', 'list', L('Links', 'קישורים'), [['name', 'text', 'Name'], ['url', 'url', 'Link']]]], { socials: S.site.socials || [] }, w => { S.site.socials = w.socials; changed(); });
  });
}
