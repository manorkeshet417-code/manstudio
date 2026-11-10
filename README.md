# Man Studio site

Static site (GitHub Pages) whose content lives in the Color Under Pressure Firebase Realtime Database:

- `site/live` - what everyone sees (pages, blocks, news, theme). Public read, studio account writes.
- `site_draft` - the admin's working copy (studio account only).
- `site_member` - the members-only code (signed-in players read).
- `site/media/<id>` - images uploaded in the editor.
- `ranked` - the Color Under Pressure leaderboard (public read).

Sign in on the site with a Color Under Pressure account. The studio account gets the editor
(Edit page, Pages, News, Design, Members) and Publish. No password is stored anywhere in this code:
the database rules decide who may write.

`js/content.js` is only the first version of the content (and the fallback when offline).
