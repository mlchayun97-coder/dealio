import { B, GRADIENTS } from "../theme/tokens";
import type {
  AssetDef,
  AssetKey,
  Activity,
  ChatMessage,
  GoalDef,
  Opportunity,
  SuccessStory,
  UserTypeDef,
} from "../types";

export const ASSETS: Record<AssetKey, AssetDef> = {
  money: { icon: "💰", label: "כסף" },
  knowledge: { icon: "🧠", label: "ידע" },
  audience: { icon: "📢", label: "קהל" },
  business: { icon: "🏢", label: "עסק" },
  connections: { icon: "🤝", label: "קשרים" },
  operations: { icon: "⚙️", label: "תפעול" },
  idea: { icon: "💡", label: "רעיון" },
};

export const DOMAINS = [
  "בריאות",
  "אוכל",
  "אירועים",
  "טכנולוגיה",
  'נדל"ן',
  "שירותים",
  "חינוך",
  "פיננסים",
];

export const OPP_TYPES = ["שותפות", "השקעה", "זכיינות", "פרויקט", "שיתוף פעולה"];

export const FEED_DATA: Opportunity[] = [
  { id: 1, emoji: "🏥", author: 'ד"ר מיכל לוי', handle: "@michal.dr", g: GRADIENTS[0], city: "חיפה", domain: "בריאות", model: "חלוקת רווחים", oppType: "עסק פעיל", seeking: "שותף / משקיע", title: "קליניקה מצליחה מחפשת שותף להתרחבות", desc: "קליניקה פעילה 5 שנים, 300 מטופלים חודשי. שותף כספי לפתיחת סניף שני בחיפה.", has: ["business", "knowledge"], needs: ["money", "connections"], score: 84, likes: 47, saved: false, liked: false, time: "2 שעות", verified: true, verifiedMethod: "business", viewing: 8, interested: 3, chatting: true, chatWith: "אורי", reasons: ["יש לך קהל רלוונטי", "חסר לך שותף תפעולי", "שניכם רוצים צמיחה"] },
  { id: 2, emoji: "💻", author: "אורי שטרן", handle: "@uri.tech", g: GRADIENTS[1], city: "תל אביב", domain: "טכנולוגיה", model: "אקוויטי", oppType: "מוצר מוכן", seeking: "שותף שיווקי", title: "SaaS B2B מוכן — מחפש שותף שיווקי עם קהל", desc: "פלטפורמת ניהול לעסקים קטנים, 40 לקוחות משלמים. מחפש מישהו עם קהל עסקי להאיץ צמיחה.", has: ["idea", "knowledge", "operations"], needs: ["audience", "connections"], score: 91, likes: 112, saved: true, liked: false, time: "5 שעות", verified: true, verifiedMethod: "linkedin", viewing: 12, interested: 5, chatting: false, chatWith: "", reasons: ["יש לך קהל עסקי", "חסר להם שיווק", "תחום תואם"] },
  { id: 3, emoji: "🎪", author: "נועם אברהם", handle: "@noam.events", g: GRADIENTS[2], city: "ירושלים", domain: "אירועים", model: "הלוואה + ריבית", oppType: "עסק פעיל", seeking: "משקיע", title: "חצר אירועים פעילה — שותף כספי לרכישת ציוד", desc: "30 הפקות בשנה. ₪200K לציוד שיכפיל קיבולת. ROI ב-18 חודש.", has: ["business", "operations", "connections"], needs: ["money"], score: 67, likes: 28, saved: false, liked: false, time: "1 יום", verified: false, verifiedMethod: "", viewing: 6, interested: 2, chatting: false, chatWith: "", reasons: ["תחום אירועים", "ROI ברור"] },
  { id: 4, emoji: "🍜", author: "גלי כהן", handle: "@gali.food", g: GRADIENTS[3], city: "תל אביב", domain: "אוכל", model: "חלוקת רווחים", oppType: "עסק פעיל", seeking: "שותף מקצועי", title: "מסעדת פיוז'ן — שף שותף עם ידע", desc: "3 שנות פעילות, קהל נאמן. המשקיע קיים — חסר שף ראשי כשותף.", has: ["audience", "business"], needs: ["knowledge"], score: 73, likes: 63, saved: false, liked: false, time: "3 ימים", verified: true, verifiedMethod: "business", viewing: 4, interested: 1, chatting: false, chatWith: "", reasons: ["קהל מזון קיים", "תחום תואם"] },
  { id: 5, emoji: "🏗️", author: "רועי מזרחי", handle: "@roi.real", g: GRADIENTS[4], city: "רמת גן", domain: 'נדל"ן', model: "אקוויטי 40%", oppType: "שלב ראשוני", seeking: "שותף טכנולוגי", title: "פלטפורמת נדל\"ן דיגיטלית — שותף טכנולוגי", desc: "קונספט מוכן, קשרים ותקציב. חסר CTO להוביל פיתוח.", has: ["money", "connections", "idea"], needs: ["knowledge", "operations"], score: 58, likes: 19, saved: false, liked: false, time: "שבוע", verified: false, verifiedMethod: "", viewing: 2, interested: 0, chatting: false, chatWith: "", reasons: ["קשרי נדל\"ן", "הון זמין"] },
];

export const ACTIVITIES: Activity[] = [
  { id: 1, icon: "🤝", text: "מיכל ואורי פתחו Deal Room", color: B.signal, time: "עכשיו" },
  { id: 2, icon: "💼", text: "רן התעניין בהצעה של גלי", color: B.blue, time: "לפני דקה" },
  { id: 3, icon: "✅", text: "רן וגלי סגרו שיתוף פעולה!", color: B.green, time: "לפני 5 דקות" },
  { id: 4, icon: "👀", text: "4 אנשים צופים בהצעה של אורי", color: B.slate, time: "לפני 8 דקות" },
  { id: 5, icon: "📋", text: "נועם אימת את פרופיל העסק שלו", color: B.warm, time: "לפני 12 דקות" },
];

export const TICKER_TEXT = [
  "🤝 מיכל ואורי פתחו Deal Room",
  "✅ רן וגלי סגרו שיתוף פעולה",
  "💼 68 שיתופי פעולה נסגרו החודש",
  "👀 12 אנשים מחפשים שותפים עכשיו",
];

export const INIT_MSGS: ChatMessage[] = [
  { id: 1, from: "them", text: "שלום! ראיתי את ההצעה שלך, מרגיש כמו התאמה טובה 🤝", t: "10:30" },
  { id: 2, from: "me", text: "שמח לשמוע. ספר מה אתה מביא לשולחן", t: "10:32" },
  { id: 3, from: "them", text: "יש לי 8 שנות ניסיון תפעולי ורשת קשרים רחבה בתחום", t: "10:35" },
];

export const USER_TYPES: UserTypeDef[] = [
  { id: "entrepreneur", icon: "🚀", label: "יזם", desc: "יש לי רעיון / עסק" },
  { id: "investor", icon: "💼", label: "משקיע", desc: "יש לי הון להשקיע" },
  { id: "business", icon: "🏢", label: "בעל עסק", desc: "יש לי עסק פעיל" },
  { id: "professional", icon: "🎓", label: "איש מקצוע", desc: "יש לי ידע / מיומנות" },
  { id: "supplier", icon: "📦", label: "ספק", desc: "אספק מוצרים / שירותים" },
  { id: "community", icon: "👥", label: "קהילה", desc: "יש לי קהל / רשת" },
];

export const SEEKING_LABELS = ["שותף", "משקיע", "עסק", "צוות", "חשיפה", "תפעול"];

export const GOALS: GoalDef[] = [
  { id: "branches", icon: "🏪", label: "לפתוח סניפים" },
  { id: "raise", icon: "💰", label: "לגייס השקעה" },
  { id: "partner", icon: "🤝", label: "למצוא שותף" },
  { id: "new_city", icon: "📍", label: "להיכנס לעיר חדשה" },
  { id: "startup", icon: "🚀", label: "להקים סטארטאפ" },
  { id: "sales", icon: "📈", label: "להרחיב מכירות" },
  { id: "acquire", icon: "🏢", label: "לרכוש עסק" },
  { id: "other", icon: "✨", label: "אחר" },
];

export const SUCCESS_STORIES: SuccessStory[] = [
  { id: 1, emoji: "☕", a: "אורית ודוד", domain: "אוכל", result: "רשת קפה חדשה", days: 4, value: "₪1.2M", city: 'ת"א' },
  { id: 2, emoji: "💻", a: "ערן ומאיה", domain: "טכנולוגיה", result: "CTO נמצא", days: 7, value: "אקוויטי 15%", city: "חיפה" },
  { id: 3, emoji: "🏥", a: 'ד"ר שירה ורועי', domain: "בריאות", result: "השקעה גויסה", days: 12, value: "₪4M", city: 'ר"ג' },
  { id: 4, emoji: "🏗️", a: "משה ואלי", domain: 'נדל"ן', result: "עסקת שיפוץ נחתמה", days: 3, value: "₪800K", city: "ירושלים" },
];

export const NAV = [
  { id: "home", icon: "🏠", label: "בית" },
  { id: "search", icon: "🔍", label: "חיפוש" },
  { id: "matches", icon: "🤝", label: "התאמות" },
  { id: "goal", icon: "🎯", label: "יעד" },
  { id: "profile", icon: "👤", label: "פרופיל" },
] as const;
