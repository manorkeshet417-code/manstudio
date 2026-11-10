// The site's starting content (everything on the site is editable by the admin; once published,
// the site uses site/live in Firebase instead). Facts come from the Man Studio itch.io pages and devlogs.
const E = (en, he) => ({ en, he: he == null ? en : he });
const Z = 'https://img.itch.zone/';
const ITCH = s => 'https://man-studio-real.itch.io/' + s;
const B = (en, he, url, style) => ({ label: E(en, he), url, style: style || 'primary' });
const F = (icon, en, he, ten, the) => ({ icon, title: E(en, he), text: E(ten, the) });
const R = (en, he, ven, vhe) => ({ label: E(en, he), value: E(ven, vhe) });

const IMG = {
  studio: Z + 'aW1nLzMxNTIzODMwLmpwZw==/original/wvNlrm.jpg',
  cup: Z + 'aW1nLzMwNjU0NzY4LnBuZw==/original/vcI2XO.png',
  rng: Z + 'aW1nLzMwNzE4NTk3LmpwZw==/original/gxrIMw.jpg',
  dobe: Z + 'aW1nLzI1OTk4MTcwLnBuZw==/original/K8FBSS.png',
  unknown: Z + 'aW1nLzMxNDIzNzY1LnBuZw==/original/Ln3T3j.png',
  story1: Z + 'aW1nLzMxMjY1OTU2LnBuZw==/original/JDAxTP.png',
  story2: Z + 'aW1nLzMwNjYxNDM3LnBuZw==/original/OnXiqM.png',
  story3: Z + 'aW1nLzMxMjY1NzU4LnBuZw==/original/3ErqGj.png',
  zone: Z + 'aW1nLzMxNzc3NjY0LmpwZw==/original/5rf%2Fp%2B.jpg',
  glitch: Z + 'aW1nLzMxNDgxNzE5LnBuZw==/original/6N1kh0.png',
  events: Z + 'aW1nLzMxNzc0NzQyLmpwZw==/original/llDuOj.jpg',
  store: Z + 'aW1nLzMxMjU1MjgyLnBuZw==/original/8Ox2UV.png'
};
const SHOTS = {
  cup: ['aW1hZ2UvNDQ0NzA0Ny8zMDY1NDgyMC5wbmc=/original/LVms7E.png', 'aW1hZ2UvNDQ0NzA0Ny8zMDY1NDgyOC5wbmc=/original/X%2Bb03c.png', 'aW1hZ2UvNDQ0NzA0Ny8zMDY1NDgyMy5wbmc=/original/8Is0kS.png', 'aW1hZ2UvNDQ0NzA0Ny8zMDY1NDgyMi5wbmc=/original/MnE1cS.png'],
  rng: ['aW1hZ2UvNTEzMTM3My8zMDcyMjE0MC5wbmc=/original/6GqFef.png', 'aW1hZ2UvNTEzMTM3My8zMDcyMjEzOS5wbmc=/original/fAygNb.png', 'aW1hZ2UvNTEzMTM3My8zMDcyMjE0MS5wbmc=/original/s8IAcS.png', 'aW1hZ2UvNTEzMTM3My8zMDcyMjEzOC5wbmc=/original/XOgJzI.png'],
  dobe: ['aW1hZ2UvNDM1MzM0Ni8yNTk4NzY3Ni5wbmc=/original/v9aWbk.png'],
  unknown: ['aW1hZ2UvNTI0MTQ1Mi8zMTQyMzc0Ni5wbmc=/original/utOnAq.png', 'aW1hZ2UvNTI0MTQ1Mi8zMTQyMzc0NS5wbmc=/original/FU3Z9n.png', 'aW1hZ2UvNTI0MTQ1Mi8zMTQyMzc0NC5wbmc=/original/n%2BOZ3i.png'],
  story1: ['aW1hZ2UvNDg3OTc3OS8zMDA3NjYxOC5wbmc=/original/lp0i4d.png'],
  story2: ['aW1hZ2UvNTAyNTY5NS8zMDE1OTE2OS5wbmc=/original/rSDZzw.png', 'aW1hZ2UvNTAyNTY5NS8zMDE1OTI3Mi5wbmc=/original/Owxuw%2F.png', 'aW1hZ2UvNTAyNTY5NS8zMDE1OTI3MS5wbmc=/original/hvCh7n.png', 'aW1hZ2UvNTAyNTY5NS8zMDE1OTI3My5wbmc=/original/wFWGTP.png'],
  zone: ['aW1hZ2UvNTI5NDE5Ni8zMTc3NzQwNy5qcGc=/original/ww%2BvPn.jpg', 'aW1hZ2UvNTI5NDE5Ni8zMTc3NzQwOS5qcGc=/original/%2B%2FCQU7.jpg']
};
const shots = k => SHOTS[k].map(s => Z + s);

const CARD = {
  cup: { title: E('Color Under Pressure'), text: E('Read the color, not the word. Ranked, 1v1 tournaments, online multiplayer and a Color Pass.', 'קוראים את הצבע, לא את המילה. דירוג, טורנירים 1 על 1, מרובה משתתפים אונליין ו-Color Pass.'), image: IMG.cup, url: '#/color-under-pressure', badge: E('ACTION · FREE', 'אקשן · חינם') },
  rng: { title: E('Color Under Pressure: RNG'), text: E('One button. One roll. 37 characters, 7 rarities, and a 1-in-1,000,000 developer card.', 'כפתור אחד, הגרלה אחת. 37 דמויות, 7 דרגות נדירות וקלף מפתח של 1 למיליון.'), image: IMG.rng, url: '#/cup-rng', badge: E('CARD GAME', 'משחק קלפים') },
  dobe: { title: E("DOBE's Workshop"), text: E('A first-person horror game in an abandoned AI factory. Made in Unreal Engine.', 'משחק אימה בגוף ראשון במפעל בינה מלאכותית נטוש. נבנה ב-Unreal Engine.'), image: IMG.dobe, url: '#/dobes-workshop', badge: E('HORROR · 3D', 'אימה · תלת-מימד') },
  unknown: { title: E('THE UNKNOWN'), text: E('Descend 100 random doors in an old mine. Something lives down there.', 'יורדים 100 דלתות אקראיות במכרה ישן. משהו חי שם למטה.'), image: IMG.unknown, url: '#/the-unknown', badge: E('NEW · HORROR', 'חדש · אימה') },
  story: { title: E('Color Under Pressure: STORY'), text: E('The colors were stolen. Play as Chroma across 4 chapters and 20 levels.', 'הצבעים נגנבו. משחקים כ-Chroma ב-4 פרקים ו-20 שלבים.'), image: IMG.story1, url: '#/cup-story', badge: E('STORY · 3 PARTS', 'עלילה · 3 חלקים') },
  friends: { title: E('Friends'), text: E('Our social app: chats, groups, calls, stories and class groups.', 'האפליקציה החברתית שלנו: צ׳אטים, קבוצות, שיחות, סטוריז וקבוצות כיתה.'), image: '', icon: '👥', url: '#/friends', badge: E('APP', 'אפליקציה') },
  store: { title: E('Man Studio Store'), text: E('The store and hub for Man Studio and indie games.', 'החנות והמרכז של Man Studio ומשחקי אינדי.'), image: IMG.store, url: 'https://manstudiohub.netlify.app/', badge: E('STORE', 'חנות') },
  story3: { title: E('Color Under Pressure: Story 3'), text: E('The next chapter of the story. In development.', 'הפרק הבא בעלילה. בפיתוח.'), image: IMG.story3, url: '#/cup-story', badge: E('COMING SOON', 'בקרוב'), soon: true }
};

const ROADMAP = [
  { date: '2026-11-07', title: E('THE UNKNOWN is out', 'THE UNKNOWN יצא'), text: E('Chapter 1: The Shafts.', 'פרק 1: הפירים.'), url: '#/the-unknown' },
  { date: '2026-11-20', title: E('Color Under Pressure on Android', 'Color Under Pressure לאנדרואיד'), text: E('The APK release on itch.io (moved to November 20). iOS and Google Play later.', 'השקת ה-APK ב-itch.io (נדחתה ל-20 בנובמבר). iOS ו-Google Play בהמשך.'), url: '#/color-under-pressure' },
  { date: '2026-12-01', when: E('December 2026', 'דצמבר 2026'), title: E('Something new', 'משהו חדש'), text: E('Announced for around December. Stay tuned.', 'הוכרז לסביבות דצמבר. הישארו מעודכנים.') },
  { date: '2027-01-01', when: E('Early 2027', 'תחילת 2027'), title: E('Color Under Pressure: Story 3', 'Color Under Pressure: Story 3'), text: E('The third chapter of the story.', 'הפרק השלישי בעלילה.'), url: '#/cup-story' },
  { date: '2027-01-15', title: E('THE MUSIC ZONE final', 'הגמר של THE MUSIC ZONE'), text: E('19:00 Israel time, live in THE ZONE arena.', '19:00 שעון ישראל, בשידור חי בזירת THE ZONE.'), url: '#/events' },
  { date: '2027-04-25', title: E('The Glitch Storm opens', 'The Glitch Storm נפתח'), text: E('Game submissions open (until May 10). Results May 22.', 'הגשת משחקים נפתחת (עד 10 במאי). תוצאות ב-22 במאי.'), url: '#/events' }
];

export const DEFAULT_SITE = {
  version: 2,
  theme: {
    mode: 'auto', preset: 'neon',
    schedule: [
      { preset: 'halloween', from: '10-10', to: '11-10' },
      { preset: 'winter', from: '12-01', to: '01-10' },
      { preset: 'zone', from: '01-11', to: '01-16' },
      { preset: 'glitch', from: '04-25', to: '05-22' },
      { preset: 'summer', from: '06-20', to: '08-31' }
    ],
    css: ''
  },
  nav: ['home', 'games', 'events', 'leaderboard', 'news', 'about'],
  pages: {
    home: {
      title: E('Home', 'בית'),
      blocks: [
        { type: 'hero', kicker: E('Indie studio · Games · Apps · Events', 'סטודיו אינדי · משחקים · אפליקציות · אירועים'), title: E('MAN STUDIO'), subtitle: E('Rush into the Future. We make games in Unreal Engine, Unity, Roblox, HTML and Python, run events for players and creators, and build apps for friends.', 'Rush into the Future. אנחנו יוצרים משחקים ב-Unreal Engine, Unity, Roblox, HTML ו-Python, מארגנים אירועים לשחקנים וליוצרים, ובונים אפליקציות לחברים.'),
          image: IMG.studio, buttons: [B('Explore the games', 'לכל המשחקים', '#/games'), B('Join the Discord', 'הצטרפו לדיסקורד', 'https://discord.gg/BgMNC4qURB', 'ghost')] },
        { type: 'news', title: E('Latest news', 'חדשות אחרונות'), count: 3 },   // the admin moved news right under the title
        { type: 'numbers', items: [{ value: E('7+'), label: E('games & apps', 'משחקים ואפליקציות') }, { value: E('3'), label: E('languages: EN · ES · HE', 'שפות: EN · ES · HE') }, { value: E('5.0★'), label: E('rating on itch.io', 'דירוג ב-itch.io') }, { value: E('3'), label: E('live events', 'אירועים חיים') }] },
        { type: 'cards', title: E('Play now', 'לשחק עכשיו'), items: [CARD.cup, CARD.unknown, CARD.dobe, CARD.rng] },
        { type: 'split', kicker: E('Coming to mobile', 'מגיע לטלפון'), title: E('Color Under Pressure on Android', 'Color Under Pressure באנדרואיד'), body: E('Our most popular game is coming to phones: touch controls, the same account and your saves. The Android APK lands on itch.io on **November 20**, with iOS and Google Play to follow.', 'המשחק הכי פופולרי שלנו מגיע לטלפון: שליטה במגע, אותו משתמש ואותן שמירות. ה-APK לאנדרואיד יוצא ב-itch.io ב-**20 בנובמבר**, ואחריו iOS ו-Google Play.'), image: SHOTS.cup[0] && Z + SHOTS.cup[0], url: '#/color-under-pressure', label: E('See the game', 'לדף המשחק') },
        { type: 'countdown', title: E('THE MUSIC ZONE final', 'הגמר של THE MUSIC ZONE'), date: '2027-01-15T17:00:00Z', text: E('A song contest live in THE ZONE arena. 50% audience, 50% jury.', 'תחרות שירים בשידור חי בזירת THE ZONE. 50% קהל, 50% שופטים.'), url: '#/events' },
        { type: 'timeline', title: E("What's next", 'מה הלאה'), items: ROADMAP },
        { type: 'leaderboard', title: E('Top players · Ranked', 'השחקנים המובילים · Ranked'), count: 5 }
      ]
    },

    games: {
      title: E('Games & Apps', 'משחקים ואפליקציות'),
      blocks: [
        { type: 'hero', kicker: E('Everything we made', 'כל מה שיצרנו'), title: E('GAMES & APPS', 'משחקים ואפליקציות'), subtitle: E('From fast color reflexes to first-person horror. Free to play.', 'מרפלקסים מהירים של צבעים ועד אימה בגוף ראשון. בחינם.'), image: IMG.studio },
        { type: 'cards', title: E('Games', 'משחקים'), items: [CARD.cup, CARD.unknown, CARD.dobe, CARD.rng, CARD.story, CARD.story3] },
        { type: 'cards', title: E('Apps & more', 'אפליקציות ועוד'), items: [CARD.friends, CARD.store] }
      ]
    },

    'color-under-pressure': {
      title: E('Color Under Pressure'), hidden: true,
      blocks: [
        { type: 'hero', kicker: E('Our most popular game', 'המשחק הכי פופולרי שלנו'), title: E('COLOR UNDER PRESSURE'), subtitle: E('A fast-paced color reaction game that challenges both your reflexes and your brain. Simple to learn. Impossible to master.', 'משחק תגובה מהיר עם צבעים שמאתגר גם את הרפלקסים וגם את המוח. קל ללמוד. בלתי אפשרי לשלוט בו.'),
          image: shots('cup')[1], cover: IMG.cup, chips: [E('Free'), E('Windows'), E('Android soon', 'אנדרואיד בקרוב'), E('Multiplayer'), E('EN · ES · HE')],
          buttons: [B('Play on itch.io', 'לשחק ב-itch.io', ITCH('color-under-pressure')), B('Microsoft Store', 'Microsoft Store', 'https://apps.microsoft.com/detail/9MTDHCPB1WHF', 'ghost')] },
        { type: 'video', url: 'https://www.youtube.com/watch?v=SSJKmmwHwd0' },
        { type: 'split', kicker: E('The twist', 'הטוויסט'), title: E('Your brain vs. your eyes', 'המוח שלכם נגד העיניים'), body: E('It is built on the **Stroop Effect**: the word "RED" might be written in blue, so your brain fights itself every single second. Click the color you see, not the word you read.\n\nEvery correct click makes the timer **5% faster**, pushing you into pure survival mode until you hit **BOSS MODE at 50 points**.', 'המשחק בנוי על **אפקט סטרופ**: המילה "אדום" יכולה להיות כתובה בכחול, אז המוח נלחם בעצמו כל שנייה. לוחצים על הצבע שרואים, לא על המילה שקוראים.\n\nכל לחיצה נכונה מאיצה את הטיימר ב-**5%**, עד מצב הישרדות מוחלט ו-**BOSS MODE ב-50 נקודות**.'), image: shots('cup')[0] },
        { type: 'features', title: E("What's inside", 'מה יש במשחק'), items: [
          F('🏆', 'Ranked', 'Ranked', 'Climb from Bronze to Master and see your name on the leaderboard.', 'מטפסים מ-Bronze עד Master ורואים את השם בטבלת השיאים.'),
          F('⚔️', '1v1 Tournaments', 'טורנירים 1 על 1', 'Fast head-to-head matches with a room code.', 'קרבות מהירים ראש בראש עם קוד חדר.'),
          F('🌐', 'Online multiplayer', 'מרובה משתתפים', 'Party up with up to 4 players online.', 'משחקים יחד עד 4 שחקנים אונליין.'),
          F('🔗', 'Flow Mode', 'Flow Mode', 'Connect the color dots without crossing lines.', 'מחברים את נקודות הצבע בלי שהקווים ייחתכו.'),
          F('🎨', 'Skins & Color Pass', 'סקינים ו-Color Pass', 'Unlock skins, titles and rewards as you play.', 'פותחים סקינים, תארים ופרסים תוך כדי משחק.'),
          F('🎃', 'Live events', 'אירועים חיים', 'Seasonal events like THE HAUNT, with a haunted mansion to explore.', 'אירועים עונתיים כמו THE HAUNT, עם אחוזה רדופה לחקור.'),
          F('🏅', 'Badges & codes', 'תגים וקודים', 'Collect badges and redeem codes for coins, skins and more.', 'אוספים תגים ומממשים קודים למטבעות, סקינים ועוד.'),
          F('🌍', '3 languages', '3 שפות', 'English, Spanish and Hebrew.', 'אנגלית, ספרדית ועברית.')] },
        { type: 'gallery', title: E('Screenshots', 'צילומי מסך'), images: shots('cup') },
        { type: 'info', title: E('Details', 'פרטים'), rows: [
          R('Status', 'סטטוס', 'Released', 'יצא'), R('Release date', 'תאריך יציאה', 'April 5, 2026', '5 באפריל 2026'), R('Platforms', 'פלטפורמות', 'Windows · Android (Nov 20)', 'Windows · אנדרואיד (20 בנובמבר)'),
          R('Made with', 'נבנה עם', 'pygame (Python)'), R('Inputs', 'שליטה', 'Mouse, touchscreen', 'עכבר, מסך מגע'), R('Multiplayer', 'מרובה משתתפים', 'Online, server-based', 'אונליין, דרך שרת'),
          R('Session', 'משך משחק', 'A few minutes', 'כמה דקות'), R('Rating', 'דירוג', '5.0 ★ on itch.io', '5.0 ★ ב-itch.io'),
          R('Jams', 'ג׳אמים', 'gamevision · Back in the Game Jam · GAME LAB · The Glitch Storm 2026')] },
        { type: 'timeline', title: E('The Color Under Pressure series', 'סדרת Color Under Pressure'), items: [
          { date: '2026-04-05', title: E('Color Under Pressure'), text: E('The original game.', 'המשחק המקורי.') },
          { date: '2026-09-15', title: E('STORY (DLC)'), text: E('The first story DLC: 4 chapters, 20 levels, 4 bosses.', 'ה-DLC העלילתי הראשון: 4 פרקים, 20 שלבים, 4 בוסים.'), url: '#/cup-story' },
          { date: '2026-10-02', title: E('Story 2'), text: E('The adventure continues.', 'ההרפתקה ממשיכה.'), url: '#/cup-story' },
          { date: '2026-10-13', title: E('RNG'), text: E('The collecting card game, same account and coins.', 'משחק הקלפים והאיסוף, אותו משתמש ואותם מטבעות.'), url: '#/cup-rng' },
          { date: '2026-11-20', title: E('Android release', 'השקה לאנדרואיד'), text: E('Color Under Pressure on phones.', 'Color Under Pressure בטלפון.') },
          { date: '2027-01-01', when: E('Early 2027', 'תחילת 2027'), title: E('Story 3'), text: E('In development.', 'בפיתוח.') }] },
        { type: 'faq', title: E('Questions', 'שאלות'), items: [
          { q: E('Is it free?', 'זה בחינם?'), a: E('Yes. Free to play on itch.io and the Microsoft Store.', 'כן. בחינם ב-itch.io וב-Microsoft Store.') },
          { q: E('Is there a phone version?', 'יש גרסה לטלפון?'), a: E('Android is coming on November 20 on itch.io, with touch controls. iOS and Google Play later.', 'אנדרואיד מגיע ב-20 בנובמבר ב-itch.io, עם שליטה במגע. iOS ו-Google Play בהמשך.') },
          { q: E('Do I need an account?', 'צריך משתמש?'), a: E('You can play as a guest. With a free account your progress is saved in the cloud, you can play Ranked, redeem codes, and sign in on this site to see your stats.', 'אפשר לשחק כאורח. עם משתמש חינמי ההתקדמות נשמרת בענן, אפשר לשחק Ranked, לממש קודים ולהתחבר לאתר הזה כדי לראות סטטיסטיקות.') },
          { q: E('Where do I find codes?', 'איפה מוצאים קודים?'), a: E('In Man Studio devlogs, collabs and on the [Discord](https://discord.gg/BgMNC4qURB).', 'בדבלוגים של Man Studio, בשיתופי פעולה וב-[דיסקורד](https://discord.gg/BgMNC4qURB).') }] },
        { type: 'leaderboard', title: E('Ranked leaderboard', 'טבלת הדירוג'), count: 10 }
      ]
    },

    'cup-rng': {
      title: E('Color Under Pressure: RNG'), hidden: true,
      blocks: [
        { type: 'hero', kicker: E('A collecting card game', 'משחק קלפים ואיסוף'), title: E('COLOR UNDER PRESSURE: RNG'), subtitle: E('One button. One roll. Who will you get? Some characters show up all the time. Others... maybe once in a lifetime.', 'כפתור אחד. הגרלה אחת. את מי תקבלו? יש דמויות שמופיעות כל הזמן, ואחרות... אולי פעם בחיים.'),
          image: shots('rng')[0], cover: IMG.rng, chips: [E('Free'), E('Windows'), E('Microsoft Store'), E('EN · ES · HE')],
          buttons: [B('Play on itch.io', 'לשחק ב-itch.io', ITCH('color-under-pressure-rng')), B('Microsoft Store', 'Microsoft Store', 'https://apps.microsoft.com/search/publisher?name=Man+Studio', 'ghost')] },
        { type: 'video', url: 'https://www.youtube.com/watch?v=7UrQV9ZRM4o' },
        { type: 'features', title: E('37 characters, 7 rarities', '37 דמויות, 7 דרגות נדירות'), items: [
          F('⚪', 'Common', 'רגיל', 'The colors you know and love.', 'הצבעים שאתם מכירים ואוהבים.'),
          F('🔵', 'Rare', 'נדיר', 'Crimson King, Ocean Lord, Pumpkin and more.', 'Crimson King, Ocean Lord, Pumpkin ועוד.'),
          F('🟣', 'Epic', 'אפי', 'Sun Thief, Chroma, Galaxy, Frost Born...', 'Sun Thief, Chroma, Galaxy, Frost Born...'),
          F('🟡', 'Legendary', 'אגדי', 'White, Black, the SHADOW-MATIC 3000.', 'White, Black, ה-SHADOW-MATIC 3000.'),
          F('🟢', 'Corrupted', 'מושחת', 'Something came out of the TAPES... He is coming.', 'משהו יצא מהקלטות... הוא מגיע.'),
          F('🔴', 'Mythic', 'מיתי', 'The Shadow and The Glitch (1 in 25,000 and rarer!).', 'The Shadow ו-The Glitch (1 ל-25,000 ופחות!).'),
          F('💛', 'Developer', 'מפתח', 'Yes, you can roll MAN STUDIO. The odds? 1 in 1,000,000.', 'כן, אפשר להוציא את MAN STUDIO. הסיכוי? 1 למיליון.'),
          F('🤫', '2 secret characters', '2 דמויות סודיות', "You can't roll them. You have to FIND them.", 'אי אפשר להגריל אותן. צריך למצוא אותן.')] },
        { type: 'features', title: E('Luck & more', 'מזל ועוד'), items: [
          F('🌈', 'Shiny', 'Shiny', 'Every roll has a 1 in 50 chance to sparkle.', 'לכל הגרלה יש סיכוי של 1 ל-50 לנצנץ.'),
          F('🆓', 'Free rolls forever', 'הגרלות חינם לתמיד', 'Plus Auto Roll, and every 10th roll is a x2 bonus roll.', 'ועוד Auto Roll, וכל הגרלה עשירית היא בונוס x2.'),
          F('🎁', 'Daily gifts', 'מתנות יומיות', 'A free gift every day, a bigger one every 7 days in a row.', 'מתנה בחינם כל יום, וגדולה יותר כל 7 ימים ברצף.'),
          F('🛒', 'Luck Shop', 'חנות המזל', 'Lucky Roll x10, Super Lucky Roll x100 and Luck Boost x2.', 'Lucky Roll x10, Super Lucky Roll x100 ו-Luck Boost x2.'),
          F('🔗', 'Connected to CUP', 'מחובר ל-CUP', 'Same account and coins as Color Under Pressure; roll MAN STUDIO for a secret badge there.', 'אותו משתמש ומטבעות כמו ב-Color Under Pressure; הוצאת MAN STUDIO נותנת שם תג סודי.'),
          F('🏆', 'Leaderboard & feed', 'שיאים ופיד', 'When someone rolls something rare, everyone sees it.', 'כשמישהו מוציא משהו נדיר, כולם רואים.'),
          F('📚', 'Index & companion', 'אינדקס ובן לוויה', 'Every character you found, and one to stand next to you.', 'כל דמות שמצאתם, ואחת שעומדת לידכם.'),
          F('🏅', '14 badges', '14 תגים', 'Plus stats, codes for Lucky Rolls and a 5-roll demo.', 'ועוד סטטיסטיקות, קודים ל-Lucky Rolls ודמו של 5 הגרלות.')] },
        { type: 'gallery', title: E('Screenshots', 'צילומי מסך'), images: shots('rng') },
        { type: 'info', title: E('Details', 'פרטים'), rows: [R('Status', 'סטטוס', 'Released', 'יצא'), R('Released', 'יצא', 'October 2026', 'אוקטובר 2026'), R('Platforms', 'פלטפורמות', 'Windows'), R('Genre', 'ז׳אנר', 'Card game', 'משחק קלפים'), R('Session', 'משך משחק', 'About half an hour', 'כחצי שעה'), R('Latest', 'עדכון אחרון', 'The winter update', 'עדכון החורף')] }
      ]
    },

    'dobes-workshop': {
      title: E("DOBE's Workshop"), hidden: true,
      blocks: [
        { type: 'hero', kicker: E('First-person horror · Unreal Engine', 'אימה בגוף ראשון · Unreal Engine'), title: E("DOBE'S WORKSHOP"), subtitle: E('"Welcome to the DOBE Workshop!" Something is still here. And it knows you\'ve come back.', '"ברוכים הבאים ל-DOBE Workshop!" משהו עדיין כאן. והוא יודע שחזרתם.'),
          image: IMG.dobe, cover: shots('dobe')[0], chips: [E('Free'), E('Windows'), E('3D'), E('Horror', 'אימה')],
          buttons: [B('Play on itch.io', 'לשחק ב-itch.io', ITCH('dobes-workshop'))] },
        { type: 'split', kicker: E('The story', 'הסיפור'), title: E('The factory never stopped', 'המפעל אף פעם לא עצר'), body: E("It was once the world's most advanced facility for AI and computer manufacturing, until one night all its employees vanished without a trace.\n\nNow, years later, you return to the abandoned factory to uncover the truth. The machines are still running. The lights are still flickering. **Something is still here.**\n\n\"Good luck.\"", 'פעם זה היה המתקן המתקדם בעולם לייצור בינה מלאכותית ומחשבים, עד שלילה אחד כל העובדים נעלמו בלי להשאיר עקבות.\n\nעכשיו, שנים אחרי, אתם חוזרים למפעל הנטוש כדי לגלות את האמת. המכונות עדיין עובדות. האורות עדיין מהבהבים. **משהו עדיין כאן.**\n\n"בהצלחה."'), image: shots('dobe')[0] },
        { type: 'features', title: E('The game', 'המשחק'), items: [
          F('👁️', 'First-person horror', 'אימה בגוף ראשון', 'Explore the factory with keyboard and mouse.', 'חוקרים את המפעל עם מקלדת ועכבר.'),
          F('🛠️', 'Unreal Engine', 'Unreal Engine', 'Built in Unreal Engine in full 3D.', 'נבנה ב-Unreal Engine בתלת-מימד מלא.'),
          F('🎨', 'Color-blind friendly', 'מותאם לעיוורי צבעים', 'And textless: you can play it in any language.', 'ובלי טקסט: אפשר לשחק בכל שפה.'),
          F('✋', 'Made by hand', 'נוצר בעבודת יד', 'No generative AI was used.', 'לא נעשה שימוש בבינה מלאכותית יוצרת.')] },
        { type: 'info', title: E('Details', 'פרטים'), rows: [R('Status', 'סטטוס', 'Released', 'יצא'), R('Release date', 'תאריך יציאה', 'March 5, 2026', '5 במרץ 2026'), R('Platforms', 'פלטפורמות', 'Windows'), R('Made with', 'נבנה עם', 'Unreal Engine'), R('Genre', 'ז׳אנר', 'Adventure · Horror', 'הרפתקה · אימה'), R('Next', 'מה הלאה', 'Chapter 2 was announced', 'פרק 2 הוכרז')] }
      ]
    },

    'the-unknown': {
      title: E('THE UNKNOWN'), hidden: true,
      blocks: [
        { type: 'hero', kicker: E('New · Chapter 1: The Shafts', 'חדש · פרק 1: הפירים'), title: E('THE UNKNOWN'), subtitle: E('Something lives in the old mine. The only way out is down.', 'משהו חי במכרה הישן. הדרך היחידה החוצה היא למטה.'),
          image: shots('unknown')[0], cover: IMG.unknown, chips: [E('Free'), E('Solo or co-op', 'לבד או עם חברים'), E('Horror', 'אימה')],
          buttons: [B('Play on itch.io', 'לשחק ב-itch.io', ITCH('the-unknown'))] },
        { type: 'text', title: E('100 doors. Every run is different.', '100 דלתות. כל ריצה אחרת.'), body: E('Descend through **100 randomly generated doors** in an abandoned mine. Every door could be your last. Reach Door 100 to see the ending... if you survive.', 'יורדים דרך **100 דלתות אקראיות** במכרה נטוש. כל דלת יכולה להיות האחרונה. מגיעים לדלת 100 כדי לראות את הסוף... אם שורדים.') },
        { type: 'features', title: E("What's down there", 'מה יש שם למטה'), items: [
          F('💡', 'RUSH', 'RUSH', 'When the lights flicker, HIDE.', 'כשהאורות מהבהבים, תתחבאו.'),
          F('👀', 'SEEK', 'SEEK', "Run. Don't look back.", 'רוצו. אל תסתכלו אחורה.'),
          F('🦯', 'THE PROSPECTOR', 'THE PROSPECTOR', "He's blind, but he hears every step. Crouch to stay silent.", 'הוא עיוור, אבל שומע כל צעד. התכופפו כדי להישאר בשקט.'),
          F('🚪', 'JACK', 'JACK', 'Not every door is empty...', 'לא כל דלת ריקה...'),
          F('💣', 'Room 50', 'חדר 50', 'Find the 5-digit code, set the charges and blow the way open.', 'מוצאים קוד בן 5 ספרות, מניחים מטענים ופורצים את הדרך.'),
          F('🛒', "Jeff's Shop", 'החנות של ג׳ף', 'Spend your coins on what keeps you alive.', 'קונים במטבעות את מה שישאיר אתכם בחיים.'),
          F('🗝️', 'Hide & find', 'להתחבא ולמצוא', 'Hide in closets, find keys, crouch through the dark.', 'מתחבאים בארונות, מוצאים מפתחות, מתכופפים בחושך.'),
          F('👥', 'With friends', 'עם חברים', 'Play solo or with friends.', 'לבד או עם חברים.')] },
        { type: 'gallery', title: E('Screenshots', 'צילומי מסך'), images: shots('unknown') },
        { type: 'info', rows: [R('Status', 'סטטוס', 'Released', 'יצא'), R('Release date', 'תאריך יציאה', 'November 7, 2026', '7 בנובמבר 2026'), R('Chapter', 'פרק', '1 · The Shafts', '1 · הפירים')] }
      ]
    },

    'cup-story': {
      title: E('Color Under Pressure: STORY'), hidden: true,
      blocks: [
        { type: 'hero', kicker: E('The story DLC series', 'סדרת ה-DLC העלילתית'), title: E('COLOR UNDER PRESSURE: STORY'), subtitle: E('The colors are gone. Someone stole them. And only you can bring them back.', 'הצבעים נעלמו. מישהו גנב אותם. ורק אתם יכולים להחזיר אותם.'), image: IMG.story1, cover: IMG.story1,
          buttons: [B('Play STORY', 'לשחק ב-STORY', ITCH('color-under-pressure-story')), B('Play Story 2', 'לשחק ב-Story 2', ITCH('color-under-pressure-story-2'), 'ghost')] },
        { type: 'split', kicker: E('Part 1', 'חלק 1'), title: E('STORY'), body: E('The first narrative DLC for Color Under Pressure. Play as **Chroma** across **4 chapters and 20 levels**, and face 4 powerful bosses: the **Crimson King**, the **Ocean Lord**, the **Sun Thief** and the mysterious **Shadow**, in a race to restore color to a dying world.', 'ה-DLC העלילתי הראשון של Color Under Pressure. משחקים כ-**Chroma** לאורך **4 פרקים ו-20 שלבים**, ונלחמים ב-4 בוסים: **Crimson King**, **Ocean Lord**, **Sun Thief** וה-**Shadow** המסתורי, במרוץ להחזיר את הצבע לעולם גוסס.'), image: shots('story1')[0], url: ITCH('color-under-pressure-story'), label: E('Play', 'לשחק') },
        { type: 'split', flip: true, kicker: E('Part 2', 'חלק 2'), title: E('Story 2'), body: E('The adventure continues in a 2D story game of about half an hour. Available in English and Spanish.', 'ההרפתקה ממשיכה במשחק עלילה דו-ממדי של כחצי שעה. באנגלית ובספרדית.'), image: shots('story2')[0], url: ITCH('color-under-pressure-story-2'), label: E('Play', 'לשחק') },
        { type: 'gallery', title: E('Story 2 screenshots', 'צילומי מסך מ-Story 2'), images: shots('story2') },
        { type: 'split', kicker: E('Part 3 · in development', 'חלק 3 · בפיתוח'), title: E('Story 3'), body: E('The next chapter is in development, planned for early 2027.', 'הפרק הבא בפיתוח, ומתוכנן לתחילת 2027.'), image: IMG.story3, url: ITCH('color-under-pressurestory-chapter-3'), label: E('Follow on itch.io', 'לעקוב ב-itch.io') }
      ]
    },

    friends: {
      title: E('Friends'), hidden: true,
      blocks: [
        { type: 'hero', kicker: E('An app by Man Studio', 'אפליקציה של Man Studio'), title: E('FRIENDS'), subtitle: E('A social network for you and your friends: messages, groups, calls, stories and videos, with a safe space for school.', 'רשת חברתית לך ולחברים: הודעות, קבוצות, שיחות, סטוריז וסרטונים, עם מקום בטוח לבית הספר.'), icon: '👥',
          chips: [E('Web'), E('Android'), E('Free')],
          buttons: [B('Open Friends', 'פתיחת Friends', 'https://manorkeshet417-code.github.io/friends/'), B('Android app', 'אפליקציה לאנדרואיד', 'https://github.com/manorkeshet417-code/friends/releases/latest/download/friends.apk', 'ghost')] },
        { type: 'features', title: E("What's inside", 'מה יש בפנים'), items: [
          F('💬', 'Chats & groups', 'צ׳אטים וקבוצות', 'Private chats, groups and servers with channels.', 'צ׳אטים פרטיים, קבוצות ושרתים עם ערוצים.'),
          F('📞', 'Calls', 'שיחות', 'Voice and video calls, including group calls.', 'שיחות קול ווידאו, כולל שיחות קבוצתיות.'),
          F('📸', 'Feed & stories', 'פיד וסטוריז', 'Photos, videos, shorts, stories and close friends.', 'תמונות, סרטונים, שורטס, סטוריז וחברים קרובים.'),
          F('🎒', 'Class groups', 'קבוצות כיתה', 'Timetable, homework, exams, files and reminders.', 'מערכת שעות, שיעורי בית, מבחנים, קבצים ותזכורות.'),
          F('📅', 'Event pages', 'דפי אירוע', 'Build a page for your event, with votes and countdowns.', 'בונים דף לאירוע, עם הצבעות וספירה לאחור.'),
          F('🛡️', 'Safety', 'בטיחות', 'Block, report, private accounts and muting.', 'חסימה, דיווח, חשבון פרטי והשתקה.'),
          F('🔔', 'Notifications', 'התראות', 'Even when the app is closed.', 'גם כשהאפליקציה סגורה.'),
          F('🌐', 'Hebrew first', 'בעברית', 'Built in Hebrew, right to left.', 'בנויה בעברית, מימין לשמאל.')] }
      ]
    },

    events: {
      title: E('Events', 'אירועים'),
      blocks: [
        { type: 'hero', kicker: E('Contests · Jams · Live shows', 'תחרויות · ג׳אמים · מופעים'), title: E('EVENTS', 'אירועים'), subtitle: E('Everything related to our game jams and the major events we organize or join.', 'כל מה שקשור לג׳אמים שלנו ולאירועים הגדולים שאנחנו מארגנים או משתתפים בהם.'), image: IMG.events },
        { type: 'countdown', title: E('THE ZONE · THE MUSIC ZONE final', 'THE ZONE · הגמר של THE MUSIC ZONE'), date: '2027-01-15T17:00:00Z', text: E('Friday, January 15, 2027 at 19:00 Israel time, live in the arena: the giant LED wall, the runway, the second stage and the crowd.', 'יום שישי, 15 בינואר 2027, ב-19:00 שעון ישראל, בשידור חי בזירה: קיר ה-LED הענק, המסלול, הבמה השנייה והקהל.'), url: ITCH('the-zone') },
        { type: 'split', kicker: E('THE ZONE', 'THE ZONE'), title: E('A song contest in a live arena', 'תחרות שירים בזירה חיה'), body: E('The lineup mixes **invited artists** chosen by Man Studio and **open submissions**: anyone can send a song. Every finalist gets their own light show, built from their song.\n\nThe arena is already open: walk around it with WASD right now.', 'הליינאפ משלב **אמנים מוזמנים** ש-Man Studio בחר ו**הגשות פתוחות**: כל אחד יכול לשלוח שיר. כל פיינליסט מקבל מופע אורות משלו, שנבנה מהשיר.\n\nהזירה כבר פתוחה: אפשר להסתובב בה עם WASD כבר עכשיו.'), image: shots('zone')[0], url: ITCH('the-zone'), label: E('Enter THE ZONE', 'כניסה ל-THE ZONE') },
        { type: 'faq', title: E('How the winner is chosen', 'איך בוחרים את המנצח'), items: [
          { q: E('The audience (50%)', 'הקהל (50%)'), a: E('You vote in a Google Forms voting form. It opens when submissions close and the songs are revealed. One vote per person.', 'מצביעים בטופס Google Forms. הוא נפתח כשההגשות נסגרות והשירים נחשפים. קול אחד לאדם.') },
          { q: E('The jury (50%)', 'השופטים (50%)'), a: E('The Man Studio jury gives its own points to the songs.', 'השופטים של Man Studio נותנים לשירים נקודות משלהם.') },
          { q: E('The results', 'התוצאות'), a: E('All votes stay secret until the final. Live in the arena the jury points come first, then the audience points, on the LED wall scoreboard. The winner performs again with the full light show.', 'כל הקולות נשארים סודיים עד הגמר. בשידור חי בזירה קודם נקודות השופטים ואז נקודות הקהל, על לוח התוצאות בקיר ה-LED. המנצח מופיע שוב עם מופע האורות המלא.') }] },
        { type: 'gallery', title: E('THE ZONE arena', 'הזירה של THE ZONE'), images: shots('zone') },
        { type: 'timeline', title: E('The Glitch Storm 2027 (game jam)', 'The Glitch Storm 2027 (ג׳אם)'), items: [
          { date: '2027-04-25', title: E('Submissions open', 'ההגשות נפתחות'), text: E('10:00 AM New York time.', '10:00 בבוקר שעון ניו יורק.') },
          { date: '2027-05-10', title: E('Submissions close, voting opens', 'ההגשות נסגרות, ההצבעה נפתחת'), text: E('10:00 AM New York time.', '10:00 בבוקר שעון ניו יורק.') },
          { date: '2027-05-22', title: E('Results', 'תוצאות'), text: E('11:00 AM New York time. Organized by Rushy Studios.', '11:00 בבוקר שעון ניו יורק. בארגון Rushy Studios.'), url: ITCH('the-glitch-storm') }] },
        { type: 'cards', title: E('All events', 'כל האירועים'), items: [
          { title: E('The Zone'), text: E('A song contest: 50% audience, 50% jury.', 'תחרות שירים: 50% קהל, 50% שופטים.'), image: IMG.zone, url: ITCH('the-zone'), badge: E('JAN 15', '15 בינואר') },
          { title: E('The Glitch Storm'), text: E('A game jam, April 25 to May 22, 2027.', 'ג׳אם משחקים, 25 באפריל עד 22 במאי 2027.'), image: IMG.glitch, url: ITCH('the-glitch-storm'), badge: E('GAME JAM', 'ג׳אם') },
          { title: E('Man Studio Events'), text: E('Every jam and event, including The Best Game Of The Year.', 'כל הג׳אמים והאירועים, כולל The Best Game Of The Year.'), image: IMG.events, url: ITCH('man-studio-events'), badge: E('HUB', 'מרכז') }] }
      ]
    },

    leaderboard: {
      title: E('Leaderboard', 'שיאים'),
      blocks: [
        { type: 'hero', kicker: E('Color Under Pressure · Ranked', 'Color Under Pressure · Ranked'), title: E('LEADERBOARD', 'טבלת השיאים'), subtitle: E('The best Ranked players, live. Climb from Bronze to Master.', 'שחקני ה-Ranked הכי טובים, בזמן אמת. מטפסים מ-Bronze עד Master.'), image: shots('cup')[2] },
        { type: 'leaderboard', title: E('Top 50', '50 המובילים'), count: 50 },
        { type: 'text', body: E('Sign in with your Color Under Pressure account (top of the page) to see your rank and stats.', 'התחברו עם המשתמש של Color Under Pressure (למעלה) כדי לראות את המקום והסטטיסטיקות שלכם.') }
      ]
    },
    news: {
      title: E('News', 'חדשות'),
      blocks: [{ type: 'news', title: E('News & updates', 'חדשות ועדכונים'), count: 50 }]
    },
    about: {
      title: E('About', 'אודות'),
      blocks: [
        { type: 'hero', kicker: E('Hi, we are', 'היי, אנחנו'), title: E('MAN STUDIO'), subtitle: E('An independent game studio creating immersive games and digital experiences.', 'סטודיו עצמאי שיוצר משחקים וחוויות דיגיטליות סוחפות.'), image: IMG.studio },
        { type: 'text', body: E('We build with **Unreal Engine, Unity, Roblox Studio, HTML, JavaScript and Python (pygame)**. Our most popular title is **Color Under Pressure**, alongside original projects like **DOBE\'s Workshop** and **THE UNKNOWN**, each with its own gameplay style and direction.\n\nWe also run events for players and creators, like THE ZONE and The Glitch Storm, and build apps like Friends.', 'אנחנו בונים עם **Unreal Engine, Unity, Roblox Studio, HTML, JavaScript ו-Python (pygame)**. המשחק הכי פופולרי שלנו הוא **Color Under Pressure**, לצד פרויקטים מקוריים כמו **DOBE\'s Workshop** ו-**THE UNKNOWN**, כל אחד בסגנון ובכיוון משלו.\n\nאנחנו גם מארגנים אירועים לשחקנים וליוצרים, כמו THE ZONE ו-The Glitch Storm, ובונים אפליקציות כמו Friends.') },
        { type: 'features', title: E('What we use', 'במה אנחנו עובדים'), items: [F('🛠️', 'Unreal Engine', 'Unreal Engine', "DOBE's Workshop", "DOBE's Workshop"), F('🐍', 'Python · pygame', 'Python · pygame', 'Color Under Pressure, STORY, RNG', 'Color Under Pressure, STORY, RNG'), F('🟥', 'Roblox Studio', 'Roblox Studio', 'Roblox projects', 'פרויקטים ב-Roblox'), F('🌐', 'HTML · JavaScript', 'HTML · JavaScript', 'THE ZONE, Friends and this site', 'THE ZONE, Friends והאתר הזה')] },
        { type: 'buttons', items: [B('YouTube', 'YouTube', 'https://youtube.com/@manstudio11', 'ghost'), B('Discord', 'Discord', 'https://discord.gg/BgMNC4qURB', 'ghost'), B('X / Twitter', 'X / Twitter', 'https://twitter.com/RushyStudio', 'ghost'), B('itch.io', 'itch.io', 'https://man-studio-real.itch.io/', 'ghost'), B('Microsoft Store', 'Microsoft Store', 'https://apps.microsoft.com/search/publisher?name=Man+Studio', 'ghost'), B('Wiki', 'ויקי', 'https://man-studio.fandom.com/wiki/Man_Studio_Wiki', 'ghost'), B('Man Studio Hub', 'Man Studio Hub', 'https://manstudiohub.netlify.app/', 'ghost')] }
      ]
    },
    me: { title: E('My stats', 'הסטטיסטיקות שלי'), hidden: true, blocks: [{ type: 'stats' }] }
  },
  news: {
    apk: { date: '2026-11-10', pinned: true, title: E('Color Under Pressure for Android: November 20', 'Color Under Pressure לאנדרואיד: 20 בנובמבר'), body: E("It's officially coming to mobile! The Android APK release moved to **November 20**. It will be on itch.io first, with iOS and Google Play planned for later.", 'זה רשמי, המשחק מגיע לטלפון! ההשקה של ה-APK לאנדרואיד זזה ל-**20 בנובמבר**. קודם ב-itch.io, ו-iOS ו-Google Play מתוכננים בהמשך.'), image: IMG.cup, url: ITCH('color-under-pressure') },
    site: { date: '2026-11-10', title: E('The new Man Studio site', 'האתר החדש של Man Studio'), body: E('Games, events, news and a live leaderboard, in English and Hebrew. Sign in with your Color Under Pressure account to see your stats.', 'משחקים, אירועים, חדשות וטבלת שיאים חיה, באנגלית ובעברית. התחברו עם המשתמש של Color Under Pressure כדי לראות את הסטטיסטיקות שלכם.'), image: '' },
    unknown: { date: '2026-11-07', title: E('THE UNKNOWN is out', 'THE UNKNOWN יצא'), body: E('Chapter 1, The Shafts: 100 random doors in an abandoned mine. Solo or with friends.', 'פרק 1, הפירים: 100 דלתות אקראיות במכרה נטוש. לבד או עם חברים.'), image: IMG.unknown, url: '#/the-unknown' },
    rngwinter: { date: '2026-11-07', title: E('RNG: the winter update', 'RNG: עדכון החורף'), body: E('The winter update for Color Under Pressure: RNG has arrived.', 'עדכון החורף של Color Under Pressure: RNG הגיע.'), image: IMG.rng, url: '#/cup-rng' },
    zone: { date: '2026-11-04', title: E('THE MUSIC ZONE: date and voting', 'THE MUSIC ZONE: התאריך וההצבעה'), body: E('The final is on Friday, January 15, 2027 at 19:00 Israel time, live in THE ZONE arena. 50% audience, 50% jury.', 'הגמר ביום שישי, 15 בינואר 2027, ב-19:00 שעון ישראל, בשידור חי בזירת THE ZONE. 50% קהל, 50% שופטים.'), image: IMG.zone, url: 'https://man-studio-real.itch.io/the-zone/devlog/1752308/the-music-zone-the-date-the-time-and-how-voting-works' },
    glitch: { date: '2026-10-28', title: E('The Glitch Storm: dates revealed', 'The Glitch Storm: התאריכים נחשפו'), body: E('Submissions open April 25, 2027, close May 10 (voting opens), and results are on May 22.', 'ההגשות נפתחות ב-25 באפריל 2027, נסגרות ב-10 במאי (ואז ההצבעה נפתחת), והתוצאות ב-22 במאי.'), image: IMG.glitch, url: 'https://man-studio-real.itch.io/the-glitch-storm/devlog/1735284/dates-revealed-for-the-glitch-storm-may-2027' }
  },
  socials: [
    { name: 'YouTube', url: 'https://youtube.com/@manstudio11' },
    { name: 'Discord', url: 'https://discord.gg/BgMNC4qURB' },
    { name: 'X', url: 'https://twitter.com/RushyStudio' },
    { name: 'itch.io', url: 'https://man-studio-real.itch.io/' },
    { name: 'Microsoft Store', url: 'https://apps.microsoft.com/search/publisher?name=Man+Studio' },
    { name: 'Wiki', url: 'https://man-studio.fandom.com/wiki/Man_Studio_Wiki' }
  ]
};
