# מפת קבצי index

בפרויקט הזה יש כמה קבצים בשם `index` בכוונה — כל אחד עושה דבר אחר. הקובץ הזה
נועד כך שלא תצטרכי לחפש אותם בתוך התיקיות.

| קובץ | תפקיד | עודכן לאחרונה |
|---|---|---|
| [`index.html`](./index.html) | נקודת הכניסה של ה-frontend (Vite) | 2026-08-10 23:52 |
| [`src/types/index.ts`](./src/types/index.ts) | טיפוסי TypeScript משותפים (`Opportunity`, `Profile`, ...) | 2026-08-10 23:54 |
| [`server/src/index.ts`](./server/src/index.ts) | קוד המקור של השרת (Express proxy ל-AI) | **2026-08-11 00:03 — המקור העדכני ביותר** |
| `server/dist/index.js` | פלט build של השרת — נוצר אוטומטית מ-`server/src/index.ts`, אין לערוך ידנית | 2026-08-11 00:13 (build) |
| `dist/index.html` | פלט build של ה-frontend — נוצר אוטומטית מ-`index.html` + `src/`, אין לערוך ידנית | 2026-08-11 00:44 (build) |

**קיצור דרך:** אם מחפשים את קובץ ה-index ה"אמיתי" (קוד מקור, לא build) שעודכן
אחרון — זה `server/src/index.ts`. קבצי ה-`dist/` הם רק פלט ונוצרים מחדש בכל
`npm run build` — אין טעם לערוך אותם ישירות.

## שינוי שבוצע (2026-08-13)
`legacy/dealio-app.jsx` הועבר ל-`__trash__/legacy/dealio-app.jsx` לבקשתך.
שימי לב: אין git בפרויקט הזה, אז זו לא הייתה מחיקה הפיכה באמצעות git — הקובץ
פשוט הוזז ונשמר שם ולא נמחק לצמיתות, למקרה שתצטרכי אותו.
