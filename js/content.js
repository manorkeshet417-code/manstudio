// The site's starting content. Once the admin publishes, the site uses what is saved in Firebase
// (site/live) instead; this file is only the first version and the fallback when offline.
const IMG = id => 'https://img.itch.zone/' + id;
const ITCH = s => 'https://man-studio-real.itch.io/' + s;

export const DEFAULT_SITE = {
  version: 1,
  theme: {
    mode: 'auto',          // 'auto' = by the calendar below; or a fixed preset
    preset: 'neon',
    schedule: [
      { preset: 'halloween', from: '10-10', to: '11-10' },
      { preset: 'winter', from: '12-01', to: '01-10' },
      { preset: 'zone', from: '01-11', to: '01-16' },
      { preset: 'summer', from: '06-20', to: '08-31' }
    ],
    css: ''
  },
  nav: ['home', 'games', 'events', 'leaderboard', 'news', 'about'],
  pages: {
    home: {
      title: { en: 'Home', he: 'בית' },
      blocks: [
        { type: 'hero', title: { en: 'MAN STUDIO', he: 'MAN STUDIO' }, subtitle: { en: 'Rush into the Future. Games, apps and events made by an indie studio.', he: 'Rush into the Future. משחקים, אפליקציות ואירועים מסטודיו אינדי.' },
          image: IMG('aW1nLzMxNTIzODMwLmpwZw==/original/wvNlrm.jpg'),
          buttons: [{ label: { en: 'Our games', he: 'המשחקים שלנו' }, url: '#/games', style: 'primary' }, { label: { en: 'Events', he: 'אירועים' }, url: '#/events', style: 'ghost' }] },
        { type: 'cards', title: { en: 'Featured', he: 'במרכז הבמה' }, items: [
          { title: { en: 'Color Under Pressure', he: 'Color Under Pressure' }, text: { en: 'The fast color game. Ranked, events, skins and more.', he: 'משחק הצבעים המהיר. דירוג, אירועים, סקינים ועוד.' }, image: IMG('aW1nLzMwNjU0NzY4LnBuZw==/original/vcI2XO.png'), url: '#/color-under-pressure', badge: { en: 'GAME', he: 'משחק' } },
          { title: { en: "DOBE's Workshop", he: "DOBE's Workshop" }, text: { en: 'An abandoned AI factory. Something is still here.', he: 'מפעל בינה מלאכותית נטוש. משהו עדיין כאן.' }, image: IMG('aW1nLzI1OTk4MTcwLnBuZw==/original/K8FBSS.png'), url: '#/dobes-workshop', badge: { en: 'ADVENTURE', he: 'הרפתקה' } },
          { title: { en: 'Color Under Pressure: RNG', he: 'Color Under Pressure: RNG' }, text: { en: 'One button. One roll. Who will you get?', he: 'כפתור אחד. הגרלה אחת. את מי תקבלו?' }, image: IMG('aW1nLzMwNzE4NTk3LmpwZw==/original/gxrIMw.jpg'), url: '#/cup-rng', badge: { en: 'CARD GAME', he: 'משחק קלפים' } }
        ] },
        { type: 'countdown', title: { en: 'THE MUSIC ZONE final', he: 'הגמר של THE MUSIC ZONE' }, date: '2027-01-15T17:00:00Z', text: { en: 'Live in THE ZONE arena. 50% audience, 50% jury.', he: 'בשידור חי בזירת THE ZONE. 50% קהל, 50% שופטים.' }, url: '#/events' },
        { type: 'news', title: { en: 'Latest news', he: 'חדשות אחרונות' }, count: 3 },
        { type: 'leaderboard', title: { en: 'Top players (Ranked)', he: 'השחקנים המובילים (Ranked)' }, count: 5 }
      ]
    },
    games: {
      title: { en: 'Games & Apps', he: 'משחקים ואפליקציות' },
      blocks: [
        { type: 'cards', title: { en: 'Games & Apps', he: 'משחקים ואפליקציות' }, items: [
          { title: { en: 'Color Under Pressure', he: 'Color Under Pressure' }, text: { en: 'Windows, Android and browser.', he: 'Windows, אנדרואיד ודפדפן.' }, image: IMG('aW1nLzMwNjU0NzY4LnBuZw==/original/vcI2XO.png'), url: '#/color-under-pressure', badge: { en: 'GAME', he: 'משחק' } },
          { title: { en: 'Color Under Pressure: RNG', he: 'Color Under Pressure: RNG' }, text: { en: '37 characters, 7 rarities.', he: '37 דמויות, 7 דרגות נדירות.' }, image: IMG('aW1nLzMwNzE4NTk3LmpwZw==/original/gxrIMw.jpg'), url: '#/cup-rng', badge: { en: 'CARD GAME', he: 'משחק קלפים' } },
          { title: { en: "DOBE's Workshop", he: "DOBE's Workshop" }, text: { en: 'Return to the abandoned factory.', he: 'חוזרים למפעל הנטוש.' }, image: IMG('aW1nLzI1OTk4MTcwLnBuZw==/original/K8FBSS.png'), url: '#/dobes-workshop', badge: { en: 'ADVENTURE', he: 'הרפתקה' } },
          { title: { en: 'Friends', he: 'Friends' }, text: { en: 'A social app for you and your friends.', he: 'רשת חברתית בשבילך ובשביל החברים.' }, image: '', icon: '👥', url: '#/friends', badge: { en: 'APP', he: 'אפליקציה' } },
          { title: { en: 'Color Under Pressure: Story 3', he: 'Color Under Pressure: Story 3' }, text: { en: 'The next chapter. Coming soon.', he: 'הפרק הבא. בקרוב.' }, image: IMG('aW1nLzMxMjY1NzU4LnBuZw==/original/3ErqGj.png'), url: ITCH('color-under-pressurestory-chapter-3'), badge: { en: 'COMING SOON', he: 'בקרוב' }, soon: true }
        ] }
      ]
    },
    'color-under-pressure': {
      title: { en: 'Color Under Pressure', he: 'Color Under Pressure' }, hidden: true,
      blocks: [
        { type: 'hero', title: { en: 'COLOR UNDER PRESSURE', he: 'COLOR UNDER PRESSURE' }, subtitle: { en: 'Read the color, not the word. Ranked, events, skins, a color pass and a haunted mansion.', he: 'קוראים את הצבע, לא את המילה. דירוג, אירועים, סקינים, Color Pass ואחוזה רדופה.' },
          image: IMG('aW1nLzMwNjU0NzY4LnBuZw==/original/vcI2XO.png'),
          buttons: [{ label: { en: 'itch.io', he: 'itch.io' }, url: ITCH('color-under-pressure'), style: 'primary' }, { label: { en: 'Microsoft Store', he: 'Microsoft Store' }, url: 'https://apps.microsoft.com/detail/9MTDHCPB1WHF', style: 'ghost' }, { label: { en: 'Android', he: 'אנדרואיד' }, url: '', style: 'ghost' }] },
        { type: 'text', title: { en: 'More from the series', he: 'עוד מהסדרה' }, body: { en: '[color under pressure: STORY](' + ITCH('color-under-pressure-story') + ')  •  [Story 2](' + ITCH('color-under-pressure-story-2') + ')  •  [Story 3 (coming soon)](' + ITCH('color-under-pressurestory-chapter-3') + ')', he: '[color under pressure: STORY](' + ITCH('color-under-pressure-story') + ')  •  [Story 2](' + ITCH('color-under-pressure-story-2') + ')  •  [Story 3 (בקרוב)](' + ITCH('color-under-pressurestory-chapter-3') + ')' } },
        { type: 'leaderboard', title: { en: 'Ranked leaderboard', he: 'טבלת הדירוג' }, count: 10 }
      ]
    },
    'cup-rng': {
      title: { en: 'Color Under Pressure: RNG', he: 'Color Under Pressure: RNG' }, hidden: true,
      blocks: [
        { type: 'hero', title: { en: 'COLOR UNDER PRESSURE: RNG', he: 'COLOR UNDER PRESSURE: RNG' }, subtitle: { en: 'One button. One roll. Who will you get?', he: 'כפתור אחד. הגרלה אחת. את מי תקבלו?' }, image: IMG('aW1nLzMwNzE4NTk3LmpwZw==/original/gxrIMw.jpg'),
          buttons: [{ label: { en: 'Play on itch.io', he: 'לשחק ב-itch.io' }, url: ITCH('color-under-pressure-rng'), style: 'primary' }] },
        { type: 'text', title: { en: '37 characters, 7 rarities', he: '37 דמויות, 7 דרגות נדירות' }, body: {
          en: 'Press ROLL, watch the cards spin... and see who you get!\n\n⚪ **Common**: the colors you know\n🔵 **Rare**: Crimson King, Ocean Lord, Pumpkin\n🟣 **Epic**: Sun Thief, Chroma, Galaxy, Frost Born\n🟡 **Legendary**: White, Black, the SHADOW-MATIC 3000\n🟢 **Corrupted**: something came out of the TAPES\n🔴 **Mythic**: The Shadow, The Glitch (1 in 25,000!)',
          he: 'לוחצים ROLL, הקלפים מסתובבים... ורואים את מי קיבלתם!\n\n⚪ **רגיל**: הצבעים שאתם מכירים\n🔵 **נדיר**: Crimson King, Ocean Lord, Pumpkin\n🟣 **אפי**: Sun Thief, Chroma, Galaxy, Frost Born\n🟡 **אגדי**: White, Black, ה-SHADOW-MATIC 3000\n🟢 **מושחת**: משהו יצא מהקלטות\n🔴 **מיתי**: The Shadow, The Glitch (1 ל-25,000!)' } }
      ]
    },
    'dobes-workshop': {
      title: { en: "DOBE's Workshop", he: "DOBE's Workshop" }, hidden: true,
      blocks: [
        { type: 'hero', title: { en: "DOBE'S WORKSHOP", he: "DOBE'S WORKSHOP" }, subtitle: { en: '"Welcome to the DOBE Workshop!"', he: '"ברוכים הבאים ל-DOBE Workshop!"' }, image: IMG('aW1nLzI1OTk4MTcwLnBuZw==/original/K8FBSS.png'),
          buttons: [{ label: { en: 'Play on itch.io', he: 'לשחק ב-itch.io' }, url: ITCH('dobes-workshop'), style: 'primary' }] },
        { type: 'text', body: {
          en: "It was once the world's most advanced facility for AI and computer manufacturing, until one night all its employees vanished without a trace.\n\nNow, years later, you return to the abandoned factory to uncover the truth.\n\nThe machines are still running. The lights are still flickering. **Something is still here.**\n\nAnd it knows you've come back.",
          he: 'פעם זה היה המתקן המתקדם בעולם לייצור בינה מלאכותית ומחשבים, עד שלילה אחד כל העובדים נעלמו בלי להשאיר עקבות.\n\nעכשיו, שנים אחרי, אתם חוזרים למפעל הנטוש כדי לגלות את האמת.\n\nהמכונות עדיין עובדות. האורות עדיין מהבהבים. **משהו עדיין כאן.**\n\nוהוא יודע שחזרתם.' } }
      ]
    },
    friends: {
      title: { en: 'Friends', he: 'Friends' }, hidden: true,
      blocks: [
        { type: 'hero', title: { en: 'FRIENDS', he: 'FRIENDS' }, subtitle: { en: 'Chats, groups, calls, stories and a class group with timetable and homework.', he: 'צ׳אטים, קבוצות, שיחות, סטוריז וקבוצת כיתה עם מערכת שעות ושיעורי בית.' }, icon: '👥',
          buttons: [{ label: { en: 'Open Friends', he: 'פתיחת Friends' }, url: 'https://manorkeshet417-code.github.io/friends/', style: 'primary' }, { label: { en: 'Android app', he: 'אפליקציה לאנדרואיד' }, url: 'https://github.com/manorkeshet417-code/friends/releases/latest/download/friends.apk', style: 'ghost' }] }
      ]
    },
    events: {
      title: { en: 'Events', he: 'אירועים' },
      blocks: [
        { type: 'hero', title: { en: 'EVENTS', he: 'אירועים' }, subtitle: { en: 'Contests, jams and live shows from Man Studio.', he: 'תחרויות, ג׳אמים ומופעים חיים של Man Studio.' }, image: IMG('aW1nLzMxNzc0NzQyLmpwZw==/original/llDuOj.jpg') },
        { type: 'countdown', title: { en: 'THE ZONE: THE MUSIC ZONE final', he: 'THE ZONE: הגמר של THE MUSIC ZONE' }, date: '2027-01-15T17:00:00Z', text: { en: 'Friday, January 15, 2027 at 19:00 Israel time. Live in the arena: the LED wall, the runway and the crowd.', he: 'יום שישי, 15 בינואר 2027, ב-19:00 שעון ישראל. בשידור חי בזירה: קיר ה-LED, המסלול והקהל.' }, url: ITCH('the-zone') },
        { type: 'cards', items: [
          { title: { en: 'The Zone', he: 'The Zone' }, text: { en: 'A song contest: 50% audience, 50% jury. Walk the arena with WASD right now.', he: 'תחרות שירים: 50% קהל, 50% שופטים. אפשר כבר להסתובב בזירה עם WASD.' }, image: IMG('aW1nLzMxNzc3NjY0LmpwZw==/original/5rf%2Fp%2B.jpg'), url: ITCH('the-zone'), badge: { en: 'JAN 15', he: '15 בינואר' } },
          { title: { en: 'The Glitch Storm', he: 'The Glitch Storm' }, text: { en: 'A Man Studio event.', he: 'אירוע של Man Studio.' }, image: IMG('aW1nLzMxNDgxNzE5LnBuZw==/original/6N1kh0.png'), url: ITCH('the-glitch-storm'), badge: { en: 'EVENT', he: 'אירוע' } },
          { title: { en: 'Man Studio Events', he: 'Man Studio Events' }, text: { en: 'Every event in one place.', he: 'כל האירועים במקום אחד.' }, image: IMG('aW1nLzMxNzc0NzQyLmpwZw==/original/llDuOj.jpg'), url: ITCH('man-studio-events'), badge: { en: 'HUB', he: 'מרכז' } }
        ] }
      ]
    },
    leaderboard: {
      title: { en: 'Leaderboard', he: 'שיאים' },
      blocks: [
        { type: 'leaderboard', title: { en: 'Color Under Pressure: Ranked', he: 'Color Under Pressure: דירוג' }, count: 50 },
        { type: 'text', body: { en: 'Sign in with your Color Under Pressure account (top of the page) to see your own stats.', he: 'התחברו עם המשתמש של Color Under Pressure (למעלה) כדי לראות את הסטטיסטיקות שלכם.' } }
      ]
    },
    news: {
      title: { en: 'News', he: 'חדשות' },
      blocks: [{ type: 'news', title: { en: 'News & updates', he: 'חדשות ועדכונים' }, count: 50 }]
    },
    about: {
      title: { en: 'About', he: 'אודות' },
      blocks: [
        { type: 'text', title: { en: 'Man Studio', he: 'Man Studio' }, body: { en: 'An indie studio making games, apps and live events. Rush into the Future.', he: 'סטודיו אינדי שיוצר משחקים, אפליקציות ואירועים חיים. Rush into the Future.' } },
        { type: 'buttons', items: [
          { label: { en: 'YouTube', he: 'YouTube' }, url: 'https://youtube.com/@manstudio11', style: 'ghost' },
          { label: { en: 'Discord', he: 'Discord' }, url: 'https://discord.gg/BgMNC4qURB', style: 'ghost' },
          { label: { en: 'X / Twitter', he: 'X / Twitter' }, url: 'https://twitter.com/RushyStudio', style: 'ghost' },
          { label: { en: 'itch.io', he: 'itch.io' }, url: 'https://man-studio-real.itch.io/', style: 'ghost' },
          { label: { en: 'Microsoft Store', he: 'Microsoft Store' }, url: 'https://apps.microsoft.com/search/publisher?name=Man+Studio', style: 'ghost' },
          { label: { en: 'Wiki', he: 'ויקי' }, url: 'https://man-studio.fandom.com/wiki/Man_Studio_Wiki', style: 'ghost' },
          { label: { en: 'Man Studio Hub', he: 'Man Studio Hub' }, url: 'https://manstudiohub.netlify.app/', style: 'ghost' }
        ] }
      ]
    },
    me: {
      title: { en: 'My stats', he: 'הסטטיסטיקות שלי' }, hidden: true,
      blocks: [{ type: 'stats' }]
    }
  },
  news: {
    welcome: { date: '2026-11-10', title: { en: 'The new Man Studio site is here', he: 'האתר החדש של Man Studio כאן' }, body: { en: 'Games, events, news and a live leaderboard, all in one place. Sign in with your Color Under Pressure account to see your stats.', he: 'משחקים, אירועים, חדשות וטבלת שיאים חיה, הכל במקום אחד. התחברו עם המשתמש של Color Under Pressure כדי לראות את הסטטיסטיקות שלכם.' }, image: '' },
    zone: { date: '2026-11-04', title: { en: 'THE MUSIC ZONE: date and voting', he: 'THE MUSIC ZONE: התאריך וההצבעה' }, body: { en: 'The final is on Friday, January 15, 2027 at 19:00 Israel time, live in THE ZONE arena. 50% audience, 50% jury.', he: 'הגמר ביום שישי, 15 בינואר 2027, ב-19:00 שעון ישראל, בשידור חי בזירת THE ZONE. 50% קהל, 50% שופטים.' }, image: IMG('aW1nLzMxNzc3NjY0LmpwZw==/original/5rf%2Fp%2B.jpg'), url: 'https://man-studio-real.itch.io/the-zone/devlog/1752308/the-music-zone-the-date-the-time-and-how-voting-works' }
  },
  socials: [
    { name: 'YouTube', url: 'https://youtube.com/@manstudio11' },
    { name: 'Discord', url: 'https://discord.gg/BgMNC4qURB' },
    { name: 'X', url: 'https://twitter.com/RushyStudio' },
    { name: 'itch.io', url: 'https://man-studio-real.itch.io/' }
  ]
};
