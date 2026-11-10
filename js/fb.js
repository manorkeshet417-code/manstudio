// Firebase over REST (no SDK): the Color Under Pressure project's Authentication + Realtime Database.
// Players sign in with their game account (same name + password as in the game).
// Nothing secret lives here: the API key is public by design; the database rules decide who may write.
export const DB = 'https://colorunderpressure-default-rtdb.firebaseio.com';
const KEY = 'AIzaSyCNrpFuDyn3HKCwWpV-RfGKKAnLO_omA2U';
const DOMAIN = 'players.colorunderpressure.game';
// The studio account. Its rights come from the database rules (auth.token.email), not from this line.
export const ADMIN_EMAIL = 'man_studio@' + DOMAIN;

const SKEY = 'ms.session';
let session = null;
try { session = JSON.parse(localStorage.getItem(SKEY) || 'null'); } catch (e) { session = null; }
const saveSession = () => { try { session ? localStorage.setItem(SKEY, JSON.stringify(session)) : localStorage.removeItem(SKEY); } catch (e) {} };

export const user = () => session;
export const isAdmin = () => !!session && session.email === ADMIN_EMAIL;

// the game turns "My Name" into the account my_name@players.colorunderpressure.game, password "CUP-" + password
function accountEmail(name) {
  const key = name.trim().toLowerCase().replace(/ /g, '_');
  if (/^[a-z0-9_-]{1,40}$/.test(key)) return key + '@' + DOMAIN;
  const hex = [...new TextEncoder().encode(key)].map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 60);
  return 'u' + hex + '@' + DOMAIN;
}

async function authCall(url, body) {
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error((d.error && d.error.message) || 'AUTH_ERROR'), { code: ((d.error && d.error.message) || 'AUTH_ERROR').split(' ')[0] });
  return d;
}

export async function signIn(name, password) {
  if (!name || !password) throw Object.assign(new Error('missing'), { code: 'MISSING' });
  const d = await authCall('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + KEY,
    { email: accountEmail(name), password: 'CUP-' + password, returnSecureToken: true });
  session = { uid: d.localId, email: d.email, name: name.trim(), idToken: d.idToken, refresh: d.refreshToken, exp: Date.now() + (+d.expiresIn || 3600) * 1000 };
  saveSession();
  return session;
}
export function signOut() { session = null; saveSession(); }

async function token() {
  if (!session) return '';
  if (Date.now() > session.exp - 300000) {
    try {
      const d = await authCall('https://securetoken.googleapis.com/v1/token?key=' + KEY, { grant_type: 'refresh_token', refresh_token: session.refresh });
      session.idToken = d.id_token; session.refresh = d.refresh_token; session.exp = Date.now() + (+d.expires_in || 3600) * 1000; saveSession();
    } catch (e) { signOut(); return ''; }
  }
  return session.idToken;
}

async function call(method, path, data, auth) {
  const t = auth ? await token() : '';
  const r = await fetch(DB + '/' + path + '.json' + (t ? '?auth=' + encodeURIComponent(t) : ''), {
    method, headers: data !== undefined ? { 'Content-Type': 'application/json' } : undefined,
    body: data !== undefined ? JSON.stringify(data) : undefined, cache: 'no-store'
  });
  const d = await r.json().catch(() => null);
  if (!r.ok) throw Object.assign(new Error((d && d.error) || 'HTTP ' + r.status), { code: r.status === 401 || r.status === 403 ? 'DENIED' : 'HTTP' });
  return d;
}
export const get = (path, auth) => call('GET', path, undefined, auth);
export const put = (path, data) => call('PUT', path, data, true);
export const patch = (path, data) => call('PATCH', path, data, true);
export const del = path => call('DELETE', path, undefined, true);
