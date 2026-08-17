import { useState, useEffect, useRef } from "react";

/* ─── DEALIO BRAND TOKENS ───────────────────────────────────── */
const B = {
  ink:    "#0D0D0D",
  canvas: "#F7F4EF",
  card:   "#FFFFFF",
  signal: "#E8402A",
  warm:   "#F2C94C",
  slate:  "#4A4A5A",
  mist:   "#E8E5DF",
  white:  "#FFFFFF",
  green:  "#2A9D6A",
  blue:   "#2A6FE8",
  // domain colors
  dc: {
    "בריאות":"#2A8FE8", "אוכל":"#E8782A", "אירועים":"#E82A8F",
    "טכנולוגיה":"#7A2AE8", "נדל\"ן":"#2AE87A", "שירותים":"#2AE8D4",
    "חינוך":"#E8C02A", "פיננסים":"#2A4AE8",
  },
};

const GRADIENTS = [
  "linear-gradient(135deg,#E8402A,#FF6B35)",
  "linear-gradient(135deg,#7A2AE8,#2A6FE8)",
  "linear-gradient(135deg,#2A9D6A,#2AE8D4)",
  "linear-gradient(135deg,#E82A8F,#7A2AE8)",
  "linear-gradient(135deg,#E8C02A,#E8782A)",
  "linear-gradient(135deg,#2A6FE8,#2AE8D4)",
  "linear-gradient(135deg,#2AE87A,#2A9D6A)",
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html,body{background:${B.canvas};color:${B.ink};font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;direction:rtl;}
input,textarea,button,select{font-family:inherit;-webkit-tap-highlight-color:transparent;}
button{transition:transform .15s cubic-bezier(.4,0,.2,1);}
button:active{transform:scale(.97);}
button:disabled{cursor:not-allowed;}
::selection{background:${B.signal}30;color:${B.ink};}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-thumb{background:${B.mist};border-radius:2px;}
:focus-visible{outline:2px solid ${B.signal};outline-offset:2px;border-radius:4px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes slideIn{from{opacity:0;transform:translateX(14px)}to{opacity:1;transform:translateX(0)}}
@keyframes dot{0%,100%{opacity:.3;transform:translateY(0)}50%{opacity:1;transform:translateY(-2px)}}
@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes glow{0%,100%{box-shadow:0 0 0 0 ${B.signal}00}50%{box-shadow:0 0 18px ${B.signal}40}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important;}
}
`;

/* ─── DATA ──────────────────────────────────────────────────── */
const ASSETS = {
  money:{icon:"💰",label:"כסף"}, knowledge:{icon:"🧠",label:"ידע"},
  audience:{icon:"📢",label:"קהל"}, business:{icon:"🏢",label:"עסק"},
  connections:{icon:"🤝",label:"קשרים"}, operations:{icon:"⚙️",label:"תפעול"},
  idea:{icon:"💡",label:"רעיון"},
};
const DOMAINS = ["בריאות","אוכל","אירועים","טכנולוגיה","נדל\"ן","שירותים","חינוך","פיננסים"];
const OPP_TYPES = ["שותפות","השקעה","זכיינות","פרויקט","שיתוף פעולה"];

const FEED_DATA = [
  {id:1,emoji:"🏥",author:"ד\"ר מיכל לוי",handle:"@michal.dr",g:GRADIENTS[0],city:"חיפה",domain:"בריאות",model:"חלוקת רווחים",oppType:"עסק פעיל",seeking:"שותף / משקיע",title:"קליניקה מצליחה מחפשת שותף להתרחבות",desc:"קליניקה פעילה 5 שנים, 300 מטופלים חודשי. שותף כספי לפתיחת סניף שני בחיפה.",has:["business","knowledge"],needs:["money","connections"],score:84,likes:47,saved:false,liked:false,time:"2 שעות",verified:true,verifiedMethod:"business",viewing:8,interested:3,chatting:true,chatWith:"אורי",reasons:["יש לך קהל רלוונטי","חסר לך שותף תפעולי","שניכם רוצים צמיחה"]},
  {id:2,emoji:"💻",author:"אורי שטרן",handle:"@uri.tech",g:GRADIENTS[1],city:"תל אביב",domain:"טכנולוגיה",model:"אקוויטי",oppType:"מוצר מוכן",seeking:"שותף שיווקי",title:"SaaS B2B מוכן — מחפש שותף שיווקי עם קהל",desc:"פלטפורמת ניהול לעסקים קטנים, 40 לקוחות משלמים. מחפש מישהו עם קהל עסקי להאיץ צמיחה.",has:["idea","knowledge","operations"],needs:["audience","connections"],score:91,likes:112,saved:true,liked:false,time:"5 שעות",verified:true,verifiedMethod:"linkedin",viewing:12,interested:5,chatting:false,chatWith:"",reasons:["יש לך קהל עסקי","חסר להם שיווק","תחום תואם"]},
  {id:3,emoji:"🎪",author:"נועם אברהם",handle:"@noam.events",g:GRADIENTS[2],city:"ירושלים",domain:"אירועים",model:"הלוואה + ריבית",oppType:"עסק פעיל",seeking:"משקיע",title:"חצר אירועים פעילה — שותף כספי לרכישת ציוד",desc:"30 הפקות בשנה. ₪200K לציוד שיכפיל קיבולת. ROI ב-18 חודש.",has:["business","operations","connections"],needs:["money"],score:67,likes:28,saved:false,liked:false,time:"1 יום",verified:false,verifiedMethod:"",viewing:6,interested:2,chatting:false,chatWith:"",reasons:["תחום אירועים","ROI ברור"]},
  {id:4,emoji:"🍜",author:"גלי כהן",handle:"@gali.food",g:GRADIENTS[3],city:"תל אביב",domain:"אוכל",model:"חלוקת רווחים",oppType:"עסק פעיל",seeking:"שותף מקצועי",title:"מסעדת פיוז'ן — שף שותף עם ידע",desc:"3 שנות פעילות, קהל נאמן. המשקיע קיים — חסר שף ראשי כשותף.",has:["audience","business"],needs:["knowledge"],score:73,likes:63,saved:false,liked:false,time:"3 ימים",verified:true,verifiedMethod:"business",viewing:4,interested:1,chatting:false,chatWith:"",reasons:["קהל מזון קיים","תחום תואם"]},
  {id:5,emoji:"🏗️",author:"רועי מזרחי",handle:"@roi.real",g:GRADIENTS[4],city:"רמת גן",domain:"נדל\"ן",model:"אקוויטי 40%",oppType:"שלב ראשוני",seeking:"שותף טכנולוגי",title:"פלטפורמת נדל\"ן דיגיטלית — שותף טכנולוגי",desc:"קונספט מוכן, קשרים ותקציב. חסר CTO להוביל פיתוח.",has:["money","connections","idea"],needs:["knowledge","operations"],score:58,likes:19,saved:false,liked:false,time:"שבוע",verified:false,verifiedMethod:"",viewing:2,interested:0,chatting:false,chatWith:"",reasons:["קשרי נדל\"ן","הון זמין"]},
];

const ACTIVITIES = [
  {id:1,icon:"🤝",text:"מיכל ואורי פתחו Deal Room",color:B.signal,time:"עכשיו"},
  {id:2,icon:"💼",text:"רן התעניין בהצעה של גלי",color:B.blue,time:"לפני דקה"},
  {id:3,icon:"✅",text:"רן וגלי סגרו שיתוף פעולה!",color:B.green,time:"לפני 5 דקות"},
  {id:4,icon:"👀",text:"4 אנשים צופים בהצעה של אורי",color:B.slate,time:"לפני 8 דקות"},
  {id:5,icon:"📋",text:"נועם אימת את פרופיל העסק שלו",color:B.warm,time:"לפני 12 דקות"},
];

const TICKER_TEXT = ["🤝 מיכל ואורי פתחו Deal Room","✅ רן וגלי סגרו שיתוף פעולה","💼 68 שיתופי פעולה נסגרו החודש","👀 12 אנשים מחפשים שותפים עכשיו"];

const INIT_MSGS = [
  {id:1,from:"them",text:"שלום! ראיתי את ההצעה שלך, מרגיש כמו התאמה טובה 🤝",t:"10:30"},
  {id:2,from:"me",text:"שמח לשמוע. ספר מה אתה מביא לשולחן",t:"10:32"},
  {id:3,from:"them",text:"יש לי 8 שנות ניסיון תפעולי ורשת קשרים רחבה בתחום",t:"10:35"},
];

const USER_TYPES = [
  {id:"entrepreneur",icon:"🚀",label:"יזם",desc:"יש לי רעיון / עסק"},
  {id:"investor",icon:"💼",label:"משקיע",desc:"יש לי הון להשקיע"},
  {id:"business",icon:"🏢",label:"בעל עסק",desc:"יש לי עסק פעיל"},
  {id:"professional",icon:"🎓",label:"איש מקצוע",desc:"יש לי ידע / מיומנות"},
  {id:"supplier",icon:"📦",label:"ספק",desc:"אספק מוצרים / שירותים"},
  {id:"community",icon:"👥",label:"קהילה",desc:"יש לי קהל / רשת"},
];

/* ─── HELPERS ───────────────────────────────────────────────── */
const btn = (x={}) => ({border:"none",cursor:"pointer",fontFamily:"inherit",transition:"all .18s cubic-bezier(.4,0,.2,1)",...x});
const domainColor = d => B.dc[d] || B.signal;

/* ─── SHARED COMPONENTS ─────────────────────────────────────── */
function Logo({size=24}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:7}}>
      <div style={{width:size,height:size,background:B.signal,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Fraunces',serif",fontSize:size*.6,color:B.white,fontWeight:700,letterSpacing:-1,flexShrink:0}}>d</div>
      <span style={{fontFamily:"'Fraunces',serif",fontSize:size*.85,fontWeight:700,color:B.ink,letterSpacing:-.5}}>dealio</span>
    </div>
  );
}

function MatchChip({score}) {
  const color = score>=80?B.signal:score>=65?B.warm:B.slate;
  const bg    = score>=80?`${B.signal}12`:score>=65?`${B.warm}20`:`${B.slate}12`;
  return (
    <div style={{display:"inline-flex",alignItems:"center",gap:4,background:bg,border:`1px solid ${color}35`,color,borderRadius:99,padding:"4px 10px",fontSize:12,fontWeight:600,fontFamily:"'JetBrains Mono',monospace"}}>
      {score}% match
    </div>
  );
}

function VerifiedBadge({verified,verifiedMethod}) {
  if(!verified) return null;
  const icon  = verifiedMethod==="linkedin"?"💼":verifiedMethod==="business"?"📋":verifiedMethod==="portfolio"?"🎨":"✓";
  const label = verifiedMethod==="linkedin"?"LinkedIn":verifiedMethod==="business"?"עסק מאומת":"מאומת";
  return <span style={{background:`${B.blue}15`,color:B.blue,border:`1px solid ${B.blue}30`,borderRadius:99,padding:"2px 8px",fontSize:10,fontWeight:600}}>{icon} {label}</span>;
}

function LiveTicker() {
  const t = TICKER_TEXT.join("   ·   ")+"   ·   "+TICKER_TEXT.join("   ·   ");
  return (
    <div style={{background:B.ink,padding:"7px 0",overflow:"hidden",fontSize:12,fontWeight:500,color:B.warm,letterSpacing:.3}}>
      <div style={{display:"inline-block",whiteSpace:"nowrap",animation:"ticker 30s linear infinite",paddingRight:40}}>{t}</div>
    </div>
  );
}

/* ─── DEAL CARD (Signature Element) ────────────────────────── */
function DealCard({o, i=0, onView, setFeed, compact=false}) {
  const [hov,setHov] = useState(false);
  const dc = domainColor(o.domain);
  const toggle = field => setFeed && setFeed(p=>p.map(x=>x.id===o.id?{...x,[field]:!x[field]}:x));

  return (
    <div
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        background:B.white,
        borderRadius:14,
        borderLeft:`4px solid ${dc}`,
        boxShadow:hov
          ? "0 1px 2px rgba(13,13,13,.04), 0 12px 32px rgba(13,13,13,.10)"
          : "0 1px 2px rgba(13,13,13,.03), 0 2px 10px rgba(13,13,13,.05)",
        transform:hov?"translateY(-2px)":"translateY(0)",
        transition:"transform .25s cubic-bezier(.16,1,.3,1), box-shadow .25s cubic-bezier(.16,1,.3,1)",
        animation:`fadeUp .5s cubic-bezier(.16,1,.3,1) both`,
        animationDelay:`${i*.06}s`,
        overflow:"hidden",
      }}
    >
      <div style={{padding:compact?"14px 16px":"18px 20px"}}>
        {/* header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:40,height:40,borderRadius:10,background:`${dc}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{o.emoji}</div>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                <span style={{fontSize:13,fontWeight:600,color:B.ink}}>{o.author}</span>
                <VerifiedBadge verified={o.verified} verifiedMethod={o.verifiedMethod}/>
              </div>
              <div style={{fontSize:11,color:B.slate,marginTop:1}}>{o.handle} · {o.time}</div>
            </div>
          </div>
          <MatchChip score={o.score}/>
        </div>

        {/* title */}
        <h3 style={{fontFamily:"'Fraunces',serif",fontSize:compact?14:16,fontWeight:700,lineHeight:1.35,color:B.ink,marginBottom:compact?8:10}}>{o.title}</h3>

        {!compact && <p style={{fontSize:13,color:B.slate,lineHeight:1.7,marginBottom:12}}>{o.desc}</p>}

        {/* meta row */}
        <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:12}}>
          <span style={{fontSize:11,color:B.slate,display:"flex",alignItems:"center",gap:3}}>📍 {o.city}</span>
          <span style={{fontSize:11,color:B.slate,display:"flex",alignItems:"center",gap:3}}>💡 {o.model}</span>
          <span style={{background:`${dc}12`,color:dc,border:`1px solid ${dc}25`,borderRadius:99,padding:"1px 8px",fontSize:10,fontWeight:600}}>{o.domain}</span>
        </div>

        {/* pulse */}
        {(o.viewing>0||o.interested>0||o.chatting) && (
          <div style={{display:"flex",gap:10,marginBottom:12,paddingBottom:12,borderBottom:`1px solid ${B.mist}`}}>
            {o.viewing>0 && <span style={{fontSize:11,color:B.blue,fontWeight:500}}>👀 {o.viewing} צופים</span>}
            {o.interested>0 && <span style={{fontSize:11,color:B.green,fontWeight:500}}>🤝 {o.interested} מעוניינים</span>}
            {o.chatting && <span style={{fontSize:11,color:B.signal,fontWeight:500,animation:"pulse 1.5s infinite"}}>💬 שיחה פעילה</span>}
          </div>
        )}

        {/* assets */}
        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:compact?0:16}}>
          {o.has?.map(k=>(
            <span key={k} style={{background:`${B.green}12`,color:B.green,border:`1px solid ${B.green}25`,borderRadius:99,padding:"3px 9px",fontSize:11,fontWeight:500}}>{ASSETS[k]?.icon} {ASSETS[k]?.label}</span>
          ))}
          {o.needs?.map(k=>(
            <span key={k} style={{background:`${B.signal}10`,color:B.signal,border:`1px solid ${B.signal}25`,borderRadius:99,padding:"3px 9px",fontSize:11,fontWeight:500}}>+ {ASSETS[k]?.label}</span>
          ))}
        </div>

        {/* actions */}
        {!compact && setFeed && (
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>onView&&onView(o)} style={{...btn(),flex:1,padding:"10px 0",background:B.signal,borderRadius:10,color:B.white,fontSize:14,fontWeight:600,fontFamily:"'Inter',sans-serif"}}>
              בדוק התאמה
            </button>
            <button onClick={()=>toggle("saved")} style={{...btn(),width:42,height:42,borderRadius:10,background:o.saved?`${B.warm}20`:B.canvas,border:`1px solid ${o.saved?B.warm:B.mist}`,fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>
              {o.saved?"💛":"🤍"}
            </button>
            <button onClick={()=>toggle("liked")} style={{...btn(),width:42,height:42,borderRadius:10,background:o.liked?`${B.green}15`:B.canvas,border:`1px solid ${o.liked?B.green:B.mist}`,fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>
              {o.liked?"✅":"💬"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── ACTIVITY PANEL ────────────────────────────────────────── */
function ActivityPanel() {
  return (
    <div style={{background:B.white,borderRadius:14,border:`1px solid ${B.mist}`,padding:16,marginBottom:20,boxShadow:"0 2px 12px rgba(0,0,0,.05)"}}>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:14,fontWeight:700,color:B.ink,marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
        <div style={{width:7,height:7,borderRadius:"50%",background:B.signal,animation:"pulse 2s infinite"}}/>
        עכשיו בדאליו
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:7}}>
        {ACTIVITIES.map((a,i)=>(
          <div key={a.id} style={{padding:"8px 10px",borderRadius:10,background:B.canvas,display:"flex",alignItems:"center",gap:8,animation:`slideIn .3s ease both`,animationDelay:`${i*.07}s`}}>
            <span style={{fontSize:14}}>{a.icon}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:12,color:B.ink,lineHeight:1.4}}>{a.text}</div>
              <div style={{fontSize:10,color:B.slate,marginTop:1}}>{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ONBOARDING ────────────────────────────────────────────── */
function AvatarStack() {
  const faces = ["🧑🏻‍💼","👩🏽‍💼","🧔🏻","👩🏻‍💻","🧑🏾‍💼"];
  return (
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <div style={{display:"flex"}}>
        {faces.map((f,i) => (
          <div key={i} style={{
            width:30, height:30, borderRadius:"50%",
            background: B.canvas, border:`2px solid ${B.canvas}`,
            outline:`1px solid ${B.mist}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:14, marginRight: i===0?0:-10,
            boxShadow:"0 1px 3px rgba(13,13,13,.08)",
            position:"relative", zIndex: faces.length - i,
          }}>{f}</div>
        ))}
      </div>
      <span style={{fontSize:12.5, color:B.slate, fontWeight:500}}>
        <strong style={{color:B.ink, fontWeight:700}}>2,400+</strong> כבר כאן
      </span>
    </div>
  );
}

function OnboardingScreen({onDone}) {
  const [step,setStep] = useState(0);
  const [dir,setDir]   = useState("fwd");
  const [data,setData] = useState({name:"",userType:"",hasAssets:[],seekingTypes:[]});
  const s = (k,v) => setData(p=>({...p,[k]:v}));
  const tog = (k,f) => setData(p=>({...p,[f]:p[f].includes(k)?p[f].filter(x=>x!==k):[...p[f],k]}));
  const go = (n) => { setDir(n>step?"fwd":"back"); setStep(n); };
  const chosenType = USER_TYPES.find(t=>t.id===data.userType);

  // Landing
  if(step===0) return (
    <div style={{minHeight:"100vh",background:B.canvas,display:"flex",flexDirection:"column"}}>
      <div style={{padding:"48px 24px 32px"}}>
        <div style={{animation:"fadeUp .5s cubic-bezier(.16,1,.3,1) both"}}>
          <Logo size={28}/>
        </div>

        <div style={{marginTop:36, marginBottom:18, animation:"fadeUp .5s cubic-bezier(.16,1,.3,1) .06s both"}}>
          <AvatarStack/>
        </div>

        <h1 style={{fontFamily:"'Fraunces',serif",fontSize:38,fontWeight:700,lineHeight:1.16,color:B.ink,marginBottom:14,letterSpacing:-.8,animation:"fadeUp .55s cubic-bezier(.16,1,.3,1) .12s both"}}>
          מצא מי מחפש<br/>
          <em style={{color:B.signal,fontStyle:"italic"}}>בדיוק</em> מה שיש לך
        </h1>
        <p style={{fontSize:16.5,color:B.slate,lineHeight:1.7,marginBottom:28,maxWidth:400,animation:"fadeUp .55s cubic-bezier(.16,1,.3,1) .18s both"}}>
          עסקים, אנשי מקצוע ומשקיעים — מתחברים על בסיס מה שיש ומה שחסר. לא קורות חיים.
        </p>

        <div style={{display:"flex",gap:10,marginBottom:32,animation:"fadeUp .55s cubic-bezier(.16,1,.3,1) .24s both"}}>
          {[["2,400+","עסקים"],["340+","שיתופי פעולה"],["₪18M+","ערך"]].map(([n,l])=>(
            <div key={l} style={{flex:1,background:B.white,border:`1px solid ${B.mist}`,borderRadius:12,padding:"11px 8px",textAlign:"center",boxShadow:"0 1px 2px rgba(13,13,13,.03), 0 2px 8px rgba(13,13,13,.05)"}}>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:16,fontWeight:500,color:B.ink}}>{n}</div>
              <div style={{fontSize:10,color:B.slate,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>

        {/* preview */}
        <div style={{animation:"fadeUp .55s cubic-bezier(.16,1,.3,1) .3s both"}}>
          <div style={{fontSize:11,fontWeight:600,color:B.slate,textTransform:"uppercase",letterSpacing:.6,marginBottom:10}}>הזדמנויות פעילות עכשיו</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {FEED_DATA.slice(0,2).map(o=>(
              <div key={o.id} style={{background:B.white,border:`1px solid ${B.mist}`,borderLeft:`3px solid ${domainColor(o.domain)}`,borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",gap:10,boxShadow:"0 1px 2px rgba(13,13,13,.03)"}}>
                <div style={{width:34,height:34,borderRadius:8,background:`${domainColor(o.domain)}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{o.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,color:B.ink,lineHeight:1.3}}>{o.title}</div>
                  <div style={{fontSize:11,color:B.slate}}>📍 {o.city}</div>
                </div>
                <MatchChip score={o.score}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{padding:"0 24px 40px",marginTop:"auto",animation:"fadeUp .5s cubic-bezier(.16,1,.3,1) .36s both"}}>
        <button onClick={()=>go(1)} style={{...btn(),width:"100%",padding:"16px",background:B.signal,borderRadius:12,color:B.white,fontSize:16,fontWeight:600,fontFamily:"'Fraunces',serif",marginBottom:14,boxShadow:`0 4px 20px ${B.signal}35`}}>
          הצטרף — בחינם
        </button>
        <button onClick={()=>onDone({name:"אורח",userType:"entrepreneur",hasAssets:[],seekingTypes:[]})} style={{...btn(),width:"100%",padding:"6px",background:"none",border:"none",color:B.slate,fontSize:13.5,fontWeight:500,textDecoration:"underline",textUnderlineOffset:3,textDecorationColor:B.mist}}>
          כניסה ישירה לפיד
        </button>
      </div>
    </div>
  );

  // Steps 1-4
  const steps = [
    <OnbStep key={1} title="מה שמך?" sub="איך נקרא לך בדאליו" step={1} total={4} dir={dir} onBack={()=>go(0)} onNext={()=>data.name.trim()&&go(2)} ok={!!data.name.trim()}>
      <input autoFocus value={data.name} onChange={e=>s("name",e.target.value)}
        onKeyDown={e=>e.key==="Enter"&&data.name.trim()&&go(2)}
        placeholder="שם מלא"
        style={{width:"100%",padding:"16px 18px",background:B.white,border:`1.5px solid ${B.mist}`,borderRadius:12,color:B.ink,fontSize:18,fontFamily:"'Fraunces',serif",outline:"none",direction:"rtl",transition:"border-color .18s, box-shadow .18s"}}
        onFocus={e=>{e.target.style.borderColor=B.signal;e.target.style.boxShadow=`0 0 0 4px ${B.signal}12`;}}
        onBlur={e=>{e.target.style.borderColor=B.mist;e.target.style.boxShadow="none";}}/>
      <p style={{fontSize:12.5,color:B.slate,marginTop:10}}>זה איך משתמשים אחרים יכירו אותך</p>
    </OnbStep>,

    <OnbStep key={2} title="מי אתה?" sub="בחר את התפקיד שמתאים לך" step={2} total={4} dir={dir} onBack={()=>go(1)} onNext={()=>data.userType&&go(3)} ok={!!data.userType}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {USER_TYPES.map(t=>{const on=data.userType===t.id;return(
          <button key={t.id} onClick={()=>s("userType",t.id)} style={{
            ...btn(),padding:"18px 12px",borderRadius:12,position:"relative",
            background:on?B.white:B.white,
            border:`1.5px solid ${on?B.signal:B.mist}`,
            display:"flex",flexDirection:"column",alignItems:"center",gap:6,
            boxShadow:on?`0 1px 2px rgba(13,13,13,.03), 0 8px 20px ${B.signal}18`:"0 1px 2px rgba(13,13,13,.03)",
            transform:on?"translateY(-1px)":"translateY(0)",
          }}>
            {on && <div style={{position:"absolute",top:8,left:8,width:16,height:16,borderRadius:"50%",background:B.signal,color:"#fff",fontSize:9,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>✓</div>}
            <span style={{fontSize:26}}>{t.icon}</span>
            <div style={{fontSize:13,fontWeight:600,color:on?B.signal:B.ink}}>{t.label}</div>
            <div style={{fontSize:10,color:B.slate,textAlign:"center"}}>{t.desc}</div>
          </button>
        );})}
      </div>
    </OnbStep>,

    <OnbStep key={3} title="מה אתה מביא?" sub="ומה אתה מחפש" step={3} total={4} dir={dir} onBack={()=>go(2)} onNext={()=>go(4)} ok={true}>
      <div style={{marginBottom:20}}>
        <div style={{fontSize:11,fontWeight:600,color:B.green,textTransform:"uppercase",letterSpacing:.6,marginBottom:10}}>יש לי</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
          {Object.entries(ASSETS).map(([k,{icon,label}])=>{const on=data.hasAssets.includes(k);return(
            <button key={k} onClick={()=>tog(k,"hasAssets")} style={{...btn(),padding:"7px 14px",borderRadius:99,fontSize:13,background:on?`${B.green}12`:B.white,color:on?B.green:B.slate,border:`1.5px solid ${on?B.green:B.mist}`,boxShadow:on?"none":"0 1px 2px rgba(13,13,13,.03)"}}>{on?"✓ ":""}{icon} {label}</button>
          );})}
        </div>
      </div>
      <div>
        <div style={{fontSize:11,fontWeight:600,color:B.signal,textTransform:"uppercase",letterSpacing:.6,marginBottom:10}}>מחפש</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
          {["שותף","משקיע","עסק","צוות","חשיפה","תפעול"].map(l=>{const on=data.seekingTypes.includes(l);return(
            <button key={l} onClick={()=>tog(l,"seekingTypes")} style={{...btn(),padding:"7px 14px",borderRadius:99,fontSize:13,background:on?`${B.signal}10`:B.white,color:on?B.signal:B.slate,border:`1.5px solid ${on?B.signal:B.mist}`,boxShadow:on?"none":"0 1px 2px rgba(13,13,13,.03)"}}>{on?"✓ ":""}{l}</button>
          );})}
        </div>
      </div>
    </OnbStep>,

    <OnbStep key={4} title="הכל מוכן!" sub="הנה ההתאמות הראשונות שלך" step={4} total={4} dir={dir} onBack={()=>go(3)} onNext={()=>onDone(data)} ok={true} nextLabel="כנס לדאליו →">
      <div style={{background:B.white,border:`1px solid ${B.mist}`,borderRadius:14,padding:18,marginBottom:20,boxShadow:"0 1px 2px rgba(13,13,13,.03), 0 4px 16px rgba(13,13,13,.06)",animation:"fadeUp .4s cubic-bezier(.16,1,.3,1) both"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
          <div style={{width:48,height:48,borderRadius:12,background:B.signal,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{chosenType?.icon||"⚡"}</div>
          <div>
            <div style={{fontFamily:"'Fraunces',serif",fontSize:17,fontWeight:700,color:B.ink}}>{data.name}</div>
            <div style={{fontSize:12,color:B.slate}}>{chosenType?.label}</div>
          </div>
        </div>
        {data.hasAssets.length>0 && <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>{data.hasAssets.map(k=><span key={k} style={{background:`${B.green}12`,color:B.green,borderRadius:99,padding:"2px 8px",fontSize:11}}>{ASSETS[k]?.icon} {ASSETS[k]?.label}</span>)}</div>}
        {data.seekingTypes.length>0 && <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{data.seekingTypes.map(l=><span key={l} style={{background:`${B.signal}10`,color:B.signal,borderRadius:99,padding:"2px 8px",fontSize:11}}>{l}</span>)}</div>}
      </div>
      <div style={{fontSize:11,fontWeight:600,color:B.slate,textTransform:"uppercase",letterSpacing:.6,marginBottom:10}}>ההתאמות הראשונות שלך</div>
      {FEED_DATA.slice(0,2).map((o,i)=>(
        <div key={o.id} style={{background:B.white,border:`1px solid ${B.mist}`,borderLeft:`3px solid ${domainColor(o.domain)}`,borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",gap:10,marginBottom:8,animation:`fadeUp .4s cubic-bezier(.16,1,.3,1) ${.1+i*.08}s both`}}>
          <div style={{width:32,height:32,borderRadius:8,background:`${domainColor(o.domain)}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{o.emoji}</div>
          <div style={{flex:1,fontSize:12,fontWeight:600,color:B.ink}}>{o.title}</div>
          <MatchChip score={o.score}/>
        </div>
      ))}
    </OnbStep>,
  ];

  if(step === 0 || step > steps.length) return null;
  return <div style={{minHeight:"100vh",background:B.canvas,overflow:"hidden"}}>{steps[step-1]}</div>;
}

function OnbStep({title,sub,step,total,dir,onBack,onNext,ok,nextLabel="המשך →",children}) {
  const slideIn = dir==="fwd"
    ? "@keyframes stepInFwd{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:translateX(0)}}"
    : "@keyframes stepInBack{from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:translateX(0)}}";
  return (
    <div key={step} style={{minHeight:"100vh",display:"flex",flexDirection:"column",padding:"32px 24px 40px",animation:`${dir==="fwd"?"stepInFwd":"stepInBack"} .32s cubic-bezier(.16,1,.3,1) both`}}>
      <style>{slideIn}</style>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:22}}>
        <Logo size={22}/>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:B.slate}}>{step} / {total}</span>
      </div>
      <div style={{display:"flex",gap:5,marginBottom:28}}>
        {Array.from({length:total}).map((_,i)=>(
          <div key={i} style={{flex:1,height:3,borderRadius:99,background:i<step?B.signal:B.mist,transition:"background .35s cubic-bezier(.16,1,.3,1)"}}/>
        ))}
      </div>
      <h2 style={{fontFamily:"'Fraunces',serif",fontSize:27,fontWeight:700,color:B.ink,marginBottom:5}}>{title}</h2>
      <p style={{fontSize:14,color:B.slate,marginBottom:26}}>{sub}</p>
      <div style={{flex:1}}>{children}</div>
      <div style={{display:"flex",gap:10,marginTop:24}}>
        {onBack && <button onClick={onBack} style={{...btn(),padding:"13px 18px",background:B.white,border:`1.5px solid ${B.mist}`,borderRadius:12,color:B.slate,fontSize:14,fontWeight:500}}>← חזור</button>}
        <button onClick={ok?onNext:null} style={{...btn(),flex:1,padding:"15px",background:ok?B.signal:"#E2DCD2",borderRadius:12,color:ok?B.white:"#A69F93",fontSize:15,fontWeight:600,fontFamily:"'Fraunces',serif",boxShadow:ok?`0 4px 16px ${B.signal}30`:"none",cursor:ok?"pointer":"not-allowed"}}>
          {nextLabel}
        </button>
      </div>
    </div>
  );
}

/* ─── HOME SCREEN ───────────────────────────────────────────── */
function HomeScreen({feed,setFeed,onView,onAdd,userName,onShowSuccess}) {
  const [dom,setDom] = useState(null);
  const [q,setQ]     = useState("");
  const list = feed.filter(o=>(!q||o.title.includes(q))&&(!dom||o.domain===dom));

  return (
    <div style={{paddingBottom:90}}>
      {/* sticky topbar */}
      <div style={{position:"sticky",top:0,zIndex:20,background:B.canvas,padding:"14px 16px 10px",borderBottom:`1px solid ${B.mist}`}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div>
            <Logo size={22}/>
            <div style={{fontSize:11,color:B.slate,marginTop:3}}>שלום, {userName||"שם"} 👋</div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <button onClick={onShowSuccess} style={{...btn(),padding:"7px 12px",background:`${B.warm}20`,border:`1px solid ${B.warm}50`,borderRadius:10,color:"#8B6914",fontSize:12,fontWeight:600}}>🌟 הצלחות</button>
            <button onClick={onAdd} style={{...btn(),padding:"8px 16px",background:B.signal,borderRadius:10,color:B.white,fontSize:13,fontWeight:600}}>+ פרסם</button>
          </div>
        </div>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="חפש הזדמנות, תחום, עיר..."
          style={{width:"100%",padding:"10px 14px",background:B.white,border:`1.5px solid ${B.mist}`,borderRadius:10,color:B.ink,fontSize:14,outline:"none",direction:"rtl",marginBottom:10,transition:"border .15s"}}
          onFocus={e=>e.target.style.borderColor=B.signal} onBlur={e=>e.target.style.borderColor=B.mist}/>
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:2}}>
          {["הכל",...DOMAINS].map(d=>{const a=d==="הכל"?!dom:dom===d;return(
            <button key={d} onClick={()=>setDom(d==="הכל"?null:d)} style={{...btn(),padding:"5px 13px",borderRadius:99,fontSize:12,fontWeight:500,background:a?B.ink:"transparent",color:a?B.white:B.slate,border:`1px solid ${a?B.ink:B.mist}`,whiteSpace:"nowrap"}}>{d}</button>
          );})}
        </div>
      </div>

      <LiveTicker/>

      <div style={{padding:"16px 16px 0"}}>
        <ActivityPanel/>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {list.map((o,i)=><DealCard key={o.id} o={o} i={i} onView={onView} setFeed={setFeed}/>)}
        </div>
      </div>
    </div>
  );
}

/* ─── ADD MODAL ─────────────────────────────────────────────── */
function AddModal({onClose,onAdd}) {
  const [f,setF] = useState({title:"",type:"",domain:"",desc:"",city:"",model:"",has:[],needs:[]});
  const s=(k,v)=>setF(p=>({...p,[k]:v}));
  const tog=(k,field)=>setF(p=>({...p,[field]:p[field].includes(k)?p[field].filter(x=>x!==k):[...p[field],k]}));
  const fi={width:"100%",padding:"12px 14px",background:B.white,border:`1.5px solid ${B.mist}`,borderRadius:10,color:B.ink,fontSize:14,outline:"none",direction:"rtl",transition:"border .15s"};

  const submit=()=>{
    if(!f.title||!f.domain)return;
    onAdd({id:Date.now(),emoji:"🆕",author:"אתה",handle:"@me",g:GRADIENTS[Math.floor(Math.random()*GRADIENTS.length)],city:f.city||"ישראל",domain:f.domain,model:f.model||"לדיון",oppType:f.type||"הזדמנות",seeking:"שותף",title:f.title,desc:f.desc||"",has:f.has,needs:f.needs,score:Math.floor(Math.random()*20)+65,likes:0,saved:false,liked:false,time:"עכשיו",verified:false,verifiedMethod:"",viewing:0,interested:0,chatting:false,chatWith:"",reasons:[]});
    onClose();
  };

  return (
    <div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,.5)",backdropFilter:"blur(6px)",display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:B.canvas,width:"100%",maxWidth:540,borderRadius:"20px 20px 0 0",maxHeight:"90vh",overflow:"auto",animation:"slideUp .3s ease"}}>
        <div style={{padding:"18px 20px 0",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <h2 style={{fontFamily:"'Fraunces',serif",fontSize:20,fontWeight:700,color:B.ink}}>פרסם הזדמנות</h2>
          <button onClick={onClose} style={{...btn(),width:30,height:30,borderRadius:"50%",background:B.mist,color:B.slate,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
        <div style={{padding:"0 20px 36px",display:"flex",flexDirection:"column",gap:14}}>
          <div><label style={{fontSize:11,fontWeight:600,color:B.slate,textTransform:"uppercase",letterSpacing:.5,marginBottom:6,display:"block"}}>כותרת *</label><input value={f.title} onChange={e=>s("title",e.target.value)} placeholder="מה ההזדמנות שלך?" style={fi} onFocus={e=>e.target.style.borderColor=B.signal} onBlur={e=>e.target.style.borderColor=B.mist}/></div>
          <div><label style={{fontSize:11,fontWeight:600,color:B.slate,textTransform:"uppercase",letterSpacing:.5,marginBottom:6,display:"block"}}>תיאור</label><textarea value={f.desc} onChange={e=>s("desc",e.target.value)} placeholder="ספר בכמה משפטים..." style={{...fi,minHeight:80,resize:"vertical"}}/></div>
          <div><label style={{fontSize:11,fontWeight:600,color:B.slate,textTransform:"uppercase",letterSpacing:.5,marginBottom:8,display:"block"}}>סוג</label><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{OPP_TYPES.map(t=><button key={t} onClick={()=>s("type",t)} style={{...btn(),padding:"6px 14px",borderRadius:99,fontSize:12,background:f.type===t?B.ink:"transparent",color:f.type===t?B.white:B.slate,border:`1px solid ${f.type===t?B.ink:B.mist}`}}>{t}</button>)}</div></div>
          <div><label style={{fontSize:11,fontWeight:600,color:B.slate,textTransform:"uppercase",letterSpacing:.5,marginBottom:8,display:"block"}}>תחום *</label><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{DOMAINS.map(d=><button key={d} onClick={()=>s("domain",d)} style={{...btn(),padding:"6px 14px",borderRadius:99,fontSize:12,background:f.domain===d?`${domainColor(d)}15`:"transparent",color:f.domain===d?domainColor(d):B.slate,border:`1px solid ${f.domain===d?domainColor(d):B.mist}`}}>{d}</button>)}</div></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div><label style={{fontSize:11,fontWeight:600,color:B.slate,textTransform:"uppercase",letterSpacing:.5,marginBottom:6,display:"block"}}>עיר</label><input value={f.city} onChange={e=>s("city",e.target.value)} placeholder="תל אביב..." style={fi} onFocus={e=>e.target.style.borderColor=B.signal} onBlur={e=>e.target.style.borderColor=B.mist}/></div>
            <div><label style={{fontSize:11,fontWeight:600,color:B.slate,textTransform:"uppercase",letterSpacing:.5,marginBottom:6,display:"block"}}>מודל</label><input value={f.model} onChange={e=>s("model",e.target.value)} placeholder="חלוקת רווחים..." style={fi} onFocus={e=>e.target.style.borderColor=B.signal} onBlur={e=>e.target.style.borderColor=B.mist}/></div>
          </div>
          <div><label style={{fontSize:11,fontWeight:600,color:B.green,textTransform:"uppercase",letterSpacing:.5,marginBottom:8,display:"block"}}>יש לי</label><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{Object.entries(ASSETS).map(([k,{icon,label}])=>{const on=f.has.includes(k);return <button key={k} onClick={()=>tog(k,"has")} style={{...btn(),padding:"6px 12px",borderRadius:99,fontSize:12,background:on?`${B.green}12`:"transparent",color:on?B.green:B.slate,border:`1px solid ${on?B.green:B.mist}`}}>{icon} {label}</button>;})}</div></div>
          <div><label style={{fontSize:11,fontWeight:600,color:B.signal,textTransform:"uppercase",letterSpacing:.5,marginBottom:8,display:"block"}}>מחפש</label><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{Object.entries(ASSETS).map(([k,{icon,label}])=>{const on=f.needs.includes(k);return <button key={k} onClick={()=>tog(k,"needs")} style={{...btn(),padding:"6px 12px",borderRadius:99,fontSize:12,background:on?`${B.signal}10`:"transparent",color:on?B.signal:B.slate,border:`1px solid ${on?B.signal:B.mist}`}}>{icon} {label}</button>;})}</div></div>
          <button onClick={submit} style={{...btn(),padding:"14px",background:f.title&&f.domain?B.signal:"#C5BEB6",borderRadius:12,color:B.white,fontSize:15,fontWeight:600,fontFamily:"'Fraunces',serif",marginTop:4}}>פרסם הזדמנות</button>
        </div>
      </div>
    </div>
  );
}

/* ─── DETAIL MODAL ──────────────────────────────────────────── */
function DetailModal({o,onClose,onChat}) {
  const [loading,setLoading] = useState(true);
  const [aiData,setAiData]   = useState(null);

  useEffect(()=>{
    (async()=>{
      try{
        const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,messages:[{role:"user",content:`נתח הזדמנות עסקית בעברית. כותרת: ${o.title} | תחום: ${o.domain} | יש להם: ${o.has?.map(k=>ASSETS[k]?.label).join(", ")} | חסר: ${o.needs?.map(k=>ASSETS[k]?.label).join(", ")} | מודל: ${o.model}. JSON בלבד ללא backticks: {"summary":"2 משפטים","pros":["כוח1","כוח2","כוח3"],"risks":["סיכון1","סיכון2"],"opener":"פתיחת שיחה מוצעת"}`}]})});
        const d=await r.json();
        setAiData(JSON.parse((d.content?.[0]?.text||"{}").replace(/```json|```/g,"").trim()));
      }catch{setAiData({summary:"לא זמין",pros:[],risks:[],opener:""});}
      setLoading(false);
    })();
  },[]);

  return (
    <div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,.45)",backdropFilter:"blur(6px)",display:"flex",alignItems:"flex-end",justifyContent:"center",animation:"fadeIn .2s ease"}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:B.canvas,width:"100%",maxWidth:540,borderRadius:"20px 20px 0 0",maxHeight:"90vh",overflow:"auto",animation:"slideUp .3s ease"}}>
        {/* hero banner */}
        <div style={{background:o.g,padding:"28px 20px 24px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.2)"}}/>
          <button onClick={onClose} style={{...btn(),position:"absolute",top:16,left:16,zIndex:2,width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,.2)",backdropFilter:"blur(8px)",color:"#fff",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
          <div style={{position:"relative",zIndex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <div style={{width:44,height:44,borderRadius:12,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{o.emoji}</div>
              <div>
                <div style={{fontSize:15,fontWeight:600,color:"#fff"}}>{o.author}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.75)"}}>{o.handle}</div>
              </div>
              <div style={{marginRight:"auto"}}><MatchChip score={o.score}/></div>
            </div>
            <h2 style={{fontFamily:"'Fraunces',serif",fontSize:20,fontWeight:700,color:"#fff",lineHeight:1.3,marginBottom:8}}>{o.title}</h2>
            <p style={{fontSize:13,color:"rgba(255,255,255,.88)",lineHeight:1.65}}>{o.desc}</p>
          </div>
        </div>

        <div style={{padding:"20px 20px 36px",display:"flex",flexDirection:"column",gap:14}}>
          {/* live stats */}
          <div style={{background:B.white,border:`1px solid ${B.mist}`,borderRadius:12,padding:14,display:"flex",gap:20,boxShadow:"0 1px 8px rgba(0,0,0,.05)"}}>
            <div style={{textAlign:"center"}}><div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:20,fontWeight:500,color:B.blue}}>{o.viewing}</div><div style={{fontSize:10,color:B.slate}}>צופים</div></div>
            <div style={{textAlign:"center"}}><div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:20,fontWeight:500,color:B.green}}>{o.interested}</div><div style={{fontSize:10,color:B.slate}}>מעוניינים</div></div>
            <div style={{textAlign:"center"}}><div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:20,fontWeight:500,color:B.warm}}>{o.likes}</div><div style={{fontSize:10,color:B.slate}}>שמרו</div></div>
            {o.chatting&&<div style={{marginRight:"auto",alignSelf:"center",fontSize:11,color:B.signal,fontWeight:600,animation:"pulse 1.5s infinite"}}>💬 שיחה פעילה עם {o.chatWith}</div>}
          </div>

          {/* reasons */}
          {o.reasons?.length>0&&(
            <div style={{background:`${B.green}08`,border:`1px solid ${B.green}25`,borderRadius:12,padding:14}}>
              <div style={{fontFamily:"'Fraunces',serif",fontSize:13,fontWeight:700,color:B.green,marginBottom:10}}>למה זו התאמה טובה</div>
              {o.reasons.map((r,i)=><div key={i} style={{fontSize:13,color:B.ink,marginBottom:6,display:"flex",gap:8}}><span style={{color:B.green,fontWeight:700}}>✓</span>{r}</div>)}
            </div>
          )}

          {/* assets */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div style={{background:`${B.green}08`,border:`1px solid ${B.green}20`,borderRadius:12,padding:14}}>
              <div style={{fontSize:10,fontWeight:600,color:B.green,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>יש להם</div>
              {o.has?.map(k=><div key={k} style={{fontSize:12,color:B.ink,marginBottom:5}}>{ASSETS[k]?.icon} {ASSETS[k]?.label}</div>)}
            </div>
            <div style={{background:`${B.signal}08`,border:`1px solid ${B.signal}20`,borderRadius:12,padding:14}}>
              <div style={{fontSize:10,fontWeight:600,color:B.signal,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>חסר להם</div>
              {o.needs?.map(k=><div key={k} style={{fontSize:12,color:B.ink,marginBottom:5}}>{ASSETS[k]?.icon} {ASSETS[k]?.label}</div>)}
            </div>
          </div>

          {/* AI */}
          <div style={{background:B.white,border:`1px solid ${B.mist}`,borderRadius:12,padding:16,boxShadow:"0 1px 8px rgba(0,0,0,.05)"}}>
            <div style={{fontFamily:"'Fraunces',serif",fontSize:13,fontWeight:700,color:B.ink,marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
              <span style={{width:20,height:20,borderRadius:"50%",background:B.signal,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#fff"}}>✦</span>
              ניתוח Dealio AI
            </div>
            {loading?(
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {[92,68,84].map((w,i)=>(
                  <div key={i} style={{
                    height:11, width:`${w}%`, borderRadius:6,
                    background:`linear-gradient(90deg,${B.mist} 25%,#F1EFE9 37%,${B.mist} 63%)`,
                    backgroundSize:"400% 100%",
                    animation:"shimmer 1.6s ease-in-out infinite",
                  }}/>
                ))}
              </div>
            )
            :aiData&&<>
              <p style={{fontSize:13,color:B.slate,lineHeight:1.75,marginBottom:12}}>{aiData.summary}</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10}}>
                {aiData.pros?.map((p,i)=><span key={i} style={{background:`${B.green}12`,color:B.green,borderRadius:99,padding:"3px 9px",fontSize:11}}>✓ {p}</span>)}
                {aiData.risks?.map((r,i)=><span key={i} style={{background:`${B.warm}18`,color:"#8B6914",borderRadius:99,padding:"3px 9px",fontSize:11}}>⚠ {r}</span>)}
              </div>
              {aiData.opener&&<div style={{background:B.canvas,borderRadius:10,padding:12,border:`1px solid ${B.mist}`}}>
                <div style={{fontSize:10,fontWeight:600,color:B.slate,textTransform:"uppercase",letterSpacing:.5,marginBottom:5}}>פתיחת שיחה מוצעת</div>
                <div style={{fontSize:13,color:B.ink,lineHeight:1.65}}>{aiData.opener}</div>
              </div>}
            </>}
          </div>

          <button onClick={()=>{onClose();onChat(o);}} style={{...btn(),padding:"15px",background:B.signal,borderRadius:12,color:B.white,fontSize:15,fontWeight:600,fontFamily:"'Fraunces',serif",boxShadow:`0 4px 18px ${B.signal}35`}}>
            פתח Deal Room 🤝
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── SEARCH SCREEN ─────────────────────────────────────────── */
function SearchScreen({feed,onView}) {
  const [q,setQ]       = useState("");
  const [dom,setDom]   = useState(null);
  const [need,setNeed] = useState(null);
  const [focused,setFocused] = useState(false);

  const qL = q.trim().toLowerCase();
  const list = feed.filter(o=>{
    const mQ=!qL||o.title?.toLowerCase().includes(qL)||o.city?.toLowerCase().includes(qL)||o.domain?.toLowerCase().includes(qL)||o.author?.toLowerCase().includes(qL)||o.desc?.toLowerCase().includes(qL);
    return mQ&&(!dom||o.domain===dom)&&(!need||o.needs?.includes(need));
  });

  const hl=(text)=>{
    if(!qL||!text)return text;
    const idx=text.toLowerCase().indexOf(qL);
    if(idx===-1)return text;
    return <span>{text.slice(0,idx)}<mark style={{background:`${B.signal}25`,color:B.signal,borderRadius:3,padding:"0 2px"}}>{text.slice(idx,idx+qL.length)}</mark>{text.slice(idx+qL.length)}</span>;
  };

  return (
    <div style={{paddingBottom:90}}>
      <div style={{position:"sticky",top:0,zIndex:20,background:B.canvas,padding:"14px 16px 10px",borderBottom:`1px solid ${B.mist}`}}>
        <div style={{fontFamily:"'Fraunces',serif",fontSize:20,fontWeight:700,color:B.ink,marginBottom:12}}>חיפוש</div>
        <div style={{position:"relative",marginBottom:10}}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="🔍  כותרת, עיר, תחום, שם..."
            style={{width:"100%",padding:"11px 14px",background:B.white,border:`1.5px solid ${focused?B.signal:B.mist}`,borderRadius:10,color:B.ink,fontSize:14,outline:"none",direction:"rtl",transition:"border .15s"}}
            onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}/>
          {q&&<button onClick={()=>setQ("")} style={{...btn(),position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",background:"none",color:B.slate,fontSize:13,lineHeight:1}}>✕</button>}
        </div>
        <div style={{display:"flex",gap:5,overflowX:"auto",paddingBottom:5,marginBottom:5}}>
          {DOMAINS.map(d=>{const a=dom===d;return <button key={d} onClick={()=>setDom(a?null:d)} style={{...btn(),padding:"4px 12px",borderRadius:99,fontSize:11,background:a?B.ink:"transparent",color:a?B.white:B.slate,border:`1px solid ${a?B.ink:B.mist}`,whiteSpace:"nowrap"}}>{d}</button>;})}
        </div>
        <div style={{display:"flex",gap:5,overflowX:"auto",paddingBottom:2}}>
          <span style={{fontSize:10,color:B.slate,alignSelf:"center",flexShrink:0,paddingLeft:4}}>צריכים:</span>
          {Object.entries(ASSETS).map(([k,{icon,label}])=>{const a=need===k;return <button key={k} onClick={()=>setNeed(a?null:k)} style={{...btn(),padding:"4px 10px",borderRadius:99,fontSize:11,background:a?`${B.signal}12`:"transparent",color:a?B.signal:B.slate,border:`1px solid ${a?B.signal:B.mist}`,whiteSpace:"nowrap"}}>{icon} {label}</button>;})}
        </div>
      </div>

      <div style={{padding:"10px 16px 6px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:11,color:B.slate}}>{list.length} תוצאות</span>
        {(q||dom||need)&&<button onClick={()=>{setQ("");setDom(null);setNeed(null);}} style={{...btn(),fontSize:11,color:B.signal,background:"none"}}>נקה ✕</button>}
      </div>

      {list.length===0&&(
        <div style={{padding:"60px 24px",textAlign:"center"}}>
          <div style={{fontSize:36,marginBottom:12}}>🔍</div>
          <div style={{fontFamily:"'Fraunces',serif",fontSize:18,fontWeight:700,color:B.ink,marginBottom:6}}>לא נמצאו תוצאות</div>
          <div style={{fontSize:14,color:B.slate}}>נסה מילות חיפוש שונות</div>
        </div>
      )}

      <div style={{display:"flex",flexDirection:"column"}}>
        {list.map((o,i)=>(
          <div key={o.id} onClick={()=>onView(o)} style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",borderBottom:`1px solid ${B.mist}`,transition:"background .15s"}}
            onMouseEnter={e=>e.currentTarget.style.background=B.white}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <div style={{width:46,height:46,borderRadius:12,background:`${domainColor(o.domain)}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0,borderLeft:`3px solid ${domainColor(o.domain)}`}}>{o.emoji}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:"'Fraunces',serif",fontSize:14,fontWeight:700,color:B.ink,lineHeight:1.3,marginBottom:3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{hl(o.title)}</div>
              <div style={{fontSize:11,color:B.slate,marginBottom:4}}>📍 {hl(o.city)} · {hl(o.domain)}</div>
              <div style={{display:"flex",gap:5}}><VerifiedBadge verified={o.verified} verifiedMethod={o.verifiedMethod}/>{o.needs?.slice(0,2).map(k=><span key={k} style={{background:`${B.signal}10`,color:B.signal,borderRadius:99,padding:"1px 7px",fontSize:10}}>+ {ASSETS[k]?.label}</span>)}</div>
            </div>
            <MatchChip score={o.score}/>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── MATCHES SCREEN ────────────────────────────────────────── */
function MatchesScreen({feed,onView,onChat}) {
  const sorted=[...feed].sort((a,b)=>b.score-a.score);
  const top=sorted[0];
  return (
    <div style={{paddingBottom:90}}>
      <div style={{padding:"16px 16px 12px",borderBottom:`1px solid ${B.mist}`}}>
        <div style={{fontFamily:"'Fraunces',serif",fontSize:22,fontWeight:700,color:B.ink,marginBottom:4}}>ההתאמות שלי</div>
        <div style={{fontSize:13,color:B.slate}}>ממוינות לפי ציון התאמה</div>
      </div>
      <div style={{padding:"16px 16px 0",display:"flex",flexDirection:"column",gap:12}}>
        {top&&(
          <div style={{background:B.signal,borderRadius:16,padding:20,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-30,left:-30,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,.08)"}}/>
            <div style={{position:"relative",zIndex:1}}>
              <div style={{fontSize:11,color:"rgba(255,255,255,.75)",fontWeight:600,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>ההתאמה הטובה ביותר</div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                <div style={{width:44,height:44,borderRadius:10,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{top.emoji}</div>
                <div>
                  <div style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:700,color:"#fff",lineHeight:1.3}}>{top.title}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.75)"}}>{top.author} · {top.city}</div>
                </div>
              </div>
              <div style={{display:"inline-flex",alignItems:"center",gap:4,background:"rgba(255,255,255,.2)",borderRadius:99,padding:"4px 12px",marginBottom:14}}>
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:14,fontWeight:500,color:"#fff"}}>{top.score}% match</span>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>onView(top)} style={{...btn(),flex:1,padding:"11px 0",background:"#fff",borderRadius:10,color:B.signal,fontSize:13,fontWeight:600}}>בדוק התאמה</button>
                <button onClick={()=>onChat(top)} style={{...btn(),flex:1,padding:"11px 0",background:"rgba(255,255,255,.2)",borderRadius:10,color:"#fff",fontSize:13,fontWeight:600,border:"1px solid rgba(255,255,255,.3)"}}>פתח שיחה</button>
              </div>
            </div>
          </div>
        )}
        {sorted.slice(1).map((o,i)=>(
          <div key={o.id} onClick={()=>onView(o)} style={{background:B.white,borderRadius:14,padding:"14px 16px",border:`1px solid ${B.mist}`,cursor:"pointer",display:"flex",alignItems:"center",gap:12,boxShadow:"0 1px 8px rgba(0,0,0,.05)",animation:`fadeUp .3s ease both`,animationDelay:`${i*.06}s`,borderLeft:`3px solid ${domainColor(o.domain)}`}}>
            <div style={{width:44,height:44,borderRadius:10,background:`${domainColor(o.domain)}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{o.emoji}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Fraunces',serif",fontSize:14,fontWeight:700,color:B.ink,lineHeight:1.3,marginBottom:3}}>{o.title}</div>
              <div style={{fontSize:11,color:B.slate}}>📍 {o.city} · {o.domain}</div>
            </div>
            <MatchChip score={o.score}/>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── VERIFICATION MODAL ────────────────────────────────────── */
function VerificationModal({onClose,onVerify}) {
  const [step,setStep]=useState(0);
  const [sel,setSel]=useState(null);
  const [input,setInput]=useState("");
  const OPTIONS=[
    {id:"email",icon:"📧",label:"אימייל",desc:"אימות בסיסי",color:B.blue},
    {id:"business",icon:"📋",label:"עסק רשום",desc:"תעודת עסק / ח.פ.",color:B.green},
    {id:"linkedin",icon:"💼",label:"LinkedIn",desc:"קישור פרופיל",color:"#0A66C2"},
    {id:"portfolio",icon:"🎨",label:"פורטפוליו",desc:"אתר / תיק עבודות",color:B.signal},
  ];
  const done=()=>{if(sel&&(sel==="business"||input.trim())){onVerify({method:sel,value:input||"uploaded"});onClose();}};
  return (
    <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.5)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"0 20px"}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:B.canvas,borderRadius:20,padding:24,width:"100%",maxWidth:400,animation:"fadeUp .3s ease"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div><h2 style={{fontFamily:"'Fraunces',serif",fontSize:18,fontWeight:700,color:B.ink}}>אימות זהות</h2><p style={{fontSize:12,color:B.slate,marginTop:3}}>בנה אמינות ב-Dealio</p></div>
          <button onClick={onClose} style={{...btn(),width:28,height:28,borderRadius:"50%",background:B.mist,color:B.slate,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
        {step===0?(
          <><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
            {OPTIONS.map(opt=>(
              <button key={opt.id} onClick={()=>{setSel(opt.id);setStep(1);}} style={{...btn(),padding:14,borderRadius:12,background:B.white,border:`1.5px solid ${opt.color}40`,display:"flex",flexDirection:"column",alignItems:"center",gap:6,boxShadow:"0 1px 6px rgba(0,0,0,.04)"}}>
                <span style={{fontSize:24}}>{opt.icon}</span>
                <div style={{fontSize:12,fontWeight:600,color:B.ink}}>{opt.label}</div>
                <div style={{fontSize:10,color:B.slate}}>{opt.desc}</div>
              </button>
            ))}
          </div>
          <div style={{background:`${B.green}10`,border:`1px solid ${B.green}25`,borderRadius:10,padding:12,fontSize:11,color:B.slate,lineHeight:1.6}}>
            <strong style={{color:B.green}}>למה לאמת?</strong> משתמשים מאומתים מקבלים 3× יותר פניות.
          </div></>
        ):(
          <><div style={{marginBottom:16}}>
            <label style={{fontSize:11,fontWeight:600,color:B.slate,textTransform:"uppercase",letterSpacing:.5,marginBottom:8,display:"block"}}>{sel==="business"?"העלה תעודת עסק":sel==="linkedin"?"קישור LinkedIn":sel==="portfolio"?"קישור לפורטפוליו":"אימייל"}</label>
            {sel==="business"?
              <div onClick={()=>setInput("uploaded")} style={{border:`2px dashed ${input?B.green:B.mist}`,borderRadius:10,padding:20,textAlign:"center",cursor:"pointer",background:input?`${B.green}08`:"transparent",transition:"all .2s"}}>
                <div style={{fontSize:24,marginBottom:6}}>{input?"✅":"📸"}</div>
                <div style={{fontSize:13,fontWeight:600,color:input?B.green:B.ink}}>{input?"קובץ נבחר":"לחץ להעלאה"}</div>
              </div>:
              <input value={input} onChange={e=>setInput(e.target.value)} placeholder={sel==="linkedin"?"https://linkedin.com/in/...":sel==="portfolio"?"https://mysite.com":"your@email.com"}
                style={{width:"100%",padding:"11px 14px",background:B.white,border:`1.5px solid ${B.mist}`,borderRadius:10,color:B.ink,fontSize:14,outline:"none",direction:"ltr",transition:"border .15s"}}
                onFocus={e=>e.target.style.borderColor=B.signal} onBlur={e=>e.target.style.borderColor=B.mist}/>
            }
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setStep(0)} style={{...btn(),flex:1,padding:"11px 0",background:B.white,border:`1px solid ${B.mist}`,borderRadius:10,color:B.slate,fontSize:14}}>← חזור</button>
            <button onClick={done} disabled={!input} style={{...btn(),flex:1,padding:"11px 0",background:input?B.green:"#C5BEB6",borderRadius:10,color:"#fff",fontSize:14,fontWeight:600,opacity:input?1:.6}}>אמת ✓</button>
          </div></>
        )}
      </div>
    </div>
  );
}

/* ─── PROFILE SCREEN ────────────────────────────────────────── */
function ProfileScreen({profile,setProfile,onGoal}) {
  const [editing,setEditing]=useState(false);
  const [showVerif,setShowVerif]=useState(false);
  const safe = profile || {name:"",city:"",bio:"",verified:false,verifiedMethod:"",hasAssets:[],seekingTypes:[],domains:[]};
  const [local,setLocal]=useState(safe);

  useEffect(()=>{ if(profile) setLocal(profile); },[profile]);

  const tog=(k,f)=>setLocal(p=>({...p,[f]:p[f]?.includes(k)?p[f].filter(x=>x!==k):[...(p[f]||[]),k]}));
  const togD=d=>setLocal(p=>({...p,domains:p.domains?.includes(d)?p.domains.filter(x=>x!==d):[...(p.domains||[]),d]}));
  const fi={width:"100%",padding:"10px 12px",background:B.white,border:`1.5px solid ${B.mist}`,borderRadius:10,color:B.ink,fontSize:14,outline:"none",direction:"rtl"};

  const handleVerify=data=>{
    const updated={...local,verified:true,verifiedMethod:data.method};
    setLocal(updated);
    setProfile(updated);
  };

  return (
    <div style={{paddingBottom:90}}>
      <div style={{padding:"16px 16px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${B.mist}`}}>
        <div style={{fontFamily:"'Fraunces',serif",fontSize:22,fontWeight:700,color:B.ink}}>הפרופיל שלי</div>
        <button onClick={()=>{
          if(editing){ setProfile({...local}); setEditing(false); }
          else { setEditing(true); }
        }} style={{...btn(),padding:"7px 16px",borderRadius:10,fontSize:13,fontWeight:500,background:editing?`${B.green}12`:B.white,border:`1.5px solid ${editing?B.green:B.mist}`,color:editing?B.green:B.ink}}>
          {editing?"✓ שמור":"ערוך"}
        </button>
      </div>
      <div style={{padding:"16px 16px 0",display:"flex",flexDirection:"column",gap:12}}>
        {/* identity */}
        <div style={{background:B.white,border:`1px solid ${B.mist}`,borderRadius:14,padding:18,display:"flex",alignItems:"center",gap:14,boxShadow:"0 2px 10px rgba(0,0,0,.05)"}}>
          <div style={{width:56,height:56,borderRadius:14,background:B.signal,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontFamily:"'Fraunces',serif",color:B.white,fontWeight:700,flexShrink:0}}>d</div>
          <div style={{flex:1}}>
            {editing?<input value={local.name} onChange={e=>setLocal(p=>({...p,name:e.target.value}))} style={{...fi,marginBottom:6,fontSize:16,fontWeight:600}}/>
            :<div style={{fontFamily:"'Fraunces',serif",fontSize:18,fontWeight:700,color:B.ink,marginBottom:5}}>{local.name}</div>}
            <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
              <span style={{fontSize:12,color:B.slate}}>🌍 {local.city||"ישראל"}</span>
              {local.verified&&<VerifiedBadge verified={true} verifiedMethod={local.verifiedMethod}/>}
            </div>
          </div>
        </div>

        {/* goal engine CTA */}
        <div style={{background:B.signal,borderRadius:14,padding:16,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
          <div>
            <div style={{fontFamily:"'Fraunces',serif",fontSize:14,fontWeight:700,color:"#fff",marginBottom:3}}>🎯 Goal Engine</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.8)"}}>הגדר יעד ונמצא לך את הדרך</div>
          </div>
          <button onClick={onGoal} style={{...btn(),padding:"8px 16px",background:"rgba(255,255,255,.2)",color:"#fff",borderRadius:99,fontSize:12,fontWeight:600,border:"1px solid rgba(255,255,255,.35)",flexShrink:0}}>
            הגדר יעד →
          </button>
        </div>

        {/* journey progress */}
        <JourneyProgress profile={local}/>
        {!local.verified?(
          <div style={{background:`${B.green}08`,border:`1px solid ${B.green}30`,borderRadius:14,padding:16,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
            <div><div style={{fontFamily:"'Fraunces',serif",fontSize:14,fontWeight:700,color:B.green,marginBottom:3}}>אמת את הזהות שלך</div><div style={{fontSize:12,color:B.slate}}>קבל 3× יותר פניות</div></div>
            <button onClick={()=>setShowVerif(true)} style={{...btn(),padding:"8px 16px",background:B.green,color:"#fff",borderRadius:99,fontSize:12,fontWeight:600,flexShrink:0}}>אמת →</button>
          </div>
        ):(
          <div style={{background:`${B.blue}08`,border:`1px solid ${B.blue}25`,borderRadius:14,padding:14,display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:20}}>✅</span>
            <div><div style={{fontFamily:"'Fraunces',serif",fontSize:14,fontWeight:700,color:B.blue}}>מאומת!</div><div style={{fontSize:11,color:B.slate}}>תג אמינות פעיל</div></div>
          </div>
        )}

        {/* has */}
        <PCard title="מה אני מביא" color={B.green}>
          <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
            {Object.entries(ASSETS).map(([k,{icon,label}])=>{const on=local.hasAssets?.includes(k);return <button key={k} onClick={()=>editing&&tog(k,"hasAssets")} style={{...btn(),padding:"7px 13px",borderRadius:99,fontSize:12,background:on?`${B.green}12`:"transparent",color:on?B.green:B.slate,border:`1px solid ${on?B.green:B.mist}`,cursor:editing?"pointer":"default"}}>{icon} {label}</button>;})}
          </div>
        </PCard>

        {/* seeking */}
        <PCard title="מה אני מחפש" color={B.signal}>
          <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
            {["שותף","משקיע","עסק","צוות","חשיפה","תפעול"].map(l=>{const on=local.seekingTypes?.includes(l);return <button key={l} onClick={()=>editing&&tog(l,"seekingTypes")} style={{...btn(),padding:"7px 13px",borderRadius:99,fontSize:12,background:on?`${B.signal}10`:"transparent",color:on?B.signal:B.slate,border:`1px solid ${on?B.signal:B.mist}`,cursor:editing?"pointer":"default"}}>{l}</button>;})}
          </div>
        </PCard>

        {/* domains */}
        <PCard title="תחומי עניין" color={B.ink}>
          <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
            {DOMAINS.map(d=>{const on=local.domains?.includes(d);const dc=domainColor(d);return <button key={d} onClick={()=>editing&&togD(d)} style={{...btn(),padding:"7px 13px",borderRadius:99,fontSize:12,background:on?`${dc}12`:"transparent",color:on?dc:B.slate,border:`1px solid ${on?dc:B.mist}`,cursor:editing?"pointer":"default"}}>{d}</button>;})}
          </div>
        </PCard>

        {/* bio */}
        <PCard title="עליי" color={B.blue}>
          {editing?<textarea value={local.bio||""} onChange={e=>setLocal(p=>({...p,bio:e.target.value}))} placeholder="ספר על עצמך..." style={{width:"100%",minHeight:88,padding:"10px 12px",background:B.white,border:`1.5px solid ${B.mist}`,borderRadius:10,color:B.ink,fontSize:14,direction:"rtl",resize:"vertical",outline:"none"}}/>
          :<p style={{fontSize:14,color:local.bio?B.ink:B.slate,lineHeight:1.75}}>{local.bio||"הוסף תיאור קצר..."}</p>}
        </PCard>
      </div>
      {showVerif&&<VerificationModal onClose={()=>setShowVerif(false)} onVerify={handleVerify}/>}
    </div>
  );
}

function PCard({title,color,children}) {
  return (
    <div style={{background:B.white,border:`1px solid ${B.mist}`,borderRadius:14,padding:16,borderTop:`3px solid ${color}`,boxShadow:"0 1px 8px rgba(0,0,0,.04)"}}>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:14,fontWeight:700,color:B.ink,marginBottom:12}}>{title}</div>
      {children}
    </div>
  );
}

/* ─── DEAL ROOM ─────────────────────────────────────────────── */
function DealRoom({opp,onBack}) {
  const [msgs,setMsgs]=useState(INIT_MSGS);
  const [input,setInput]=useState("");
  const [typing,setTyping]=useState(false);
  const endRef=useRef(null);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[msgs,typing]);
  const STAGES=["👋 קשר","🤝 היכרות","💡 הצעה","✍️ חתימה"];

  const send=async()=>{
    if(!input.trim())return;
    const t=new Date().toLocaleTimeString("he-IL",{hour:"2-digit",minute:"2-digit"});
    const me={id:Date.now(),from:"me",text:input,t};
    setMsgs(p=>[...p,me]); const txt=input; setInput(""); setTyping(true);
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,system:`אתה ${opp?.author}, בעל ההזדמנות "${opp?.title}". ענה בעברית קצרה ועניינית, 2-3 משפטים.`,messages:[...msgs.map(m=>({role:m.from==="me"?"user":"assistant",content:m.text})),{role:"user",content:txt}]})});
      const d=await r.json();
      setMsgs(p=>[...p,{id:Date.now()+1,from:"them",text:d.content?.[0]?.text||"...",t:new Date().toLocaleTimeString("he-IL",{hour:"2-digit",minute:"2-digit"})}]);
    }catch{setMsgs(p=>[...p,{id:Date.now()+1,from:"them",text:"מצטערים, נסה שוב",t:""}]);}
    setTyping(false);
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:B.canvas}}>
      {/* header */}
      <div style={{padding:"12px 16px",background:B.white,borderBottom:`1px solid ${B.mist}`,display:"flex",alignItems:"center",gap:12,boxShadow:"0 1px 8px rgba(0,0,0,.04)"}}>
        <button onClick={onBack} style={{...btn(),width:34,height:34,borderRadius:10,background:B.canvas,border:`1px solid ${B.mist}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,color:B.slate}}>←</button>
        <div style={{width:36,height:36,borderRadius:10,background:`${domainColor(opp?.domain)}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{opp?.emoji}</div>
        <div style={{flex:1}}>
          <div style={{fontFamily:"'Fraunces',serif",fontSize:14,fontWeight:700,color:B.ink}}>Deal Room</div>
          <div style={{fontSize:11,color:B.green,display:"flex",alignItems:"center",gap:4}}>
            <div style={{width:5,height:5,borderRadius:"50%",background:B.green,animation:"pulse 2s infinite"}}/>
            {opp?.author} · פעיל
          </div>
        </div>
        <MatchChip score={opp?.score||80}/>
      </div>

      {/* stages */}
      <div style={{padding:"8px 16px",background:B.white,borderBottom:`1px solid ${B.mist}`,display:"flex",gap:6,overflowX:"auto"}}>
        {STAGES.map((s,i)=>(
          <div key={s} style={{display:"flex",alignItems:"center",gap:4,flexShrink:0}}>
            <div style={{width:18,height:18,borderRadius:"50%",fontSize:8,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",background:i===0?B.signal:B.mist,color:i===0?"#fff":B.slate}}>{i===0?"✓":i+1}</div>
            <span style={{fontSize:11,color:i===0?B.signal:B.slate,fontWeight:i===0?600:400}}>{s}</span>
            {i<STAGES.length-1&&<div style={{width:10,height:1,background:B.mist,marginLeft:2}}/>}
          </div>
        ))}
      </div>

      {/* messages */}
      <div style={{flex:1,overflow:"auto",padding:14,display:"flex",flexDirection:"column",gap:10}}>
        {msgs.map(m=>(
          <div key={m.id} style={{display:"flex",justifyContent:m.from==="me"?"flex-start":"flex-end",animation:"slideIn .2s ease"}}>
            <div style={{maxWidth:"76%",padding:"10px 14px",fontSize:14,lineHeight:1.6,background:m.from==="me"?B.signal:B.white,color:m.from==="me"?B.white:B.ink,borderRadius:m.from==="me"?"16px 16px 4px 16px":"16px 16px 16px 4px",boxShadow:m.from==="them"?"0 1px 6px rgba(0,0,0,.07)":"none",border:m.from==="them"?`1px solid ${B.mist}`:"none"}}>
              {m.text}
              {m.t&&<div style={{fontSize:10,color:m.from==="me"?"rgba(255,255,255,.5)":B.slate,marginTop:4,textAlign:"left"}}>{m.t}</div>}
            </div>
          </div>
        ))}
        {typing&&<div style={{display:"flex",justifyContent:"flex-end"}}><div style={{background:B.white,borderRadius:"16px 16px 16px 4px",padding:"12px 16px",border:`1px solid ${B.mist}`,boxShadow:"0 1px 6px rgba(0,0,0,.06)"}}><div style={{display:"flex",gap:4}}>{[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:B.mist,animation:`dot 1.3s ease infinite`,animationDelay:`${i*.18}s`}}/>)}</div></div></div>}
        <div ref={endRef}/>
      </div>

      {/* input */}
      <div style={{padding:"10px 12px",background:B.white,borderTop:`1px solid ${B.mist}`,display:"flex",gap:8,alignItems:"center"}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
          placeholder="כתוב הודעה..."
          style={{flex:1,padding:"10px 14px",background:B.canvas,border:`1.5px solid ${B.mist}`,borderRadius:99,fontSize:14,color:B.ink,outline:"none",direction:"rtl",transition:"border .15s"}}
          onFocus={e=>e.target.style.borderColor=B.signal} onBlur={e=>e.target.style.borderColor=B.mist}/>
        <button onClick={send} style={{...btn(),width:42,height:42,borderRadius:"50%",background:input.trim()?B.signal:B.mist,color:input.trim()?B.white:B.slate,fontSize:17,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}>⚡</button>
      </div>
    </div>
  );
}

/* ─── GOAL ENGINE ───────────────────────────────────────────── */
const GOALS = [
  {id:"branches",icon:"🏪",label:"לפתוח סניפים"},
  {id:"raise",icon:"💰",label:"לגייס השקעה"},
  {id:"partner",icon:"🤝",label:"למצוא שותף"},
  {id:"new_city",icon:"📍",label:"להיכנס לעיר חדשה"},
  {id:"startup",icon:"🚀",label:"להקים סטארטאפ"},
  {id:"sales",icon:"📈",label:"להרחיב מכירות"},
  {id:"acquire",icon:"🏢",label:"לרכוש עסק"},
  {id:"other",icon:"✨",label:"אחר"},
];

function GoalEngine({onClose}) {
  const [step,setStep]         = useState(0);
  const [goal,setGoal]         = useState(null);
  const [answers,setAnswers]   = useState({budget:"",stage:"",missing:"",timeline:"",area:""});
  const [blueprint,setBlueprint] = useState(null);
  const [loading,setLoading]   = useState(false);

  const s = (k,v) => setAnswers(p=>({...p,[k]:v}));
  const fi = {width:"100%",padding:"11px 14px",background:B.canvas,border:`1.5px solid ${B.mist}`,borderRadius:10,color:B.ink,fontSize:14,outline:"none",direction:"rtl",transition:"border .15s"};

  const buildBlueprint = async () => {
    setLoading(true); setStep(3);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          messages:[{role:"user",content:
            `אתה יועץ עסקי ב-Dealio. המשתמש רוצה: "${GOALS.find(g=>g.id===goal)?.label}". פרטים: תקציב: ${answers.budget}, שלב: ${answers.stage}, חסר: ${answers.missing}, ציר זמן: ${answers.timeline}, אזור: ${answers.area}.
            
            צור Growth Blueprint בעברית. JSON בלבד ללא backticks:
            {"title":"כותרת קצרה","summary":"משפט אחד","needs":[{"icon":"💰","label":"משקיע","desc":"מה בדיוק"},{"icon":"🤝","label":"שותף תפעול","desc":"מה בדיוק"},{"icon":"📋","label":"עו\"ד","desc":"מה בדיוק"},{"icon":"⚙️","label":"מנהל","desc":"מה בדיוק"}],"timeline":"ציר זמן","first_step":"הצעד הראשון שהוא צריך לעשות עכשיו"}`
          }]
        })
      });
      const d = await r.json();
      setBlueprint(JSON.parse((d.content?.[0]?.text||"{}").replace(/```json|```/g,"").trim()));
    } catch { setBlueprint({title:"Blueprint",summary:"לא ניתן לטעון",needs:[],timeline:"",first_step:""}); }
    setLoading(false);
  };

  const goalObj = GOALS.find(g=>g.id===goal);

  return (
    <div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,.5)",backdropFilter:"blur(6px)",display:"flex",alignItems:"flex-end",justifyContent:"center"}}
      onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:B.canvas,width:"100%",maxWidth:540,borderRadius:"20px 20px 0 0",maxHeight:"90vh",overflow:"auto",animation:"slideUp .3s ease"}}>
        <div style={{padding:"18px 20px 0",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
          <div>
            <h2 style={{fontFamily:"'Fraunces',serif",fontSize:20,fontWeight:700,color:B.ink}}>Goal Engine</h2>
            <p style={{fontSize:12,color:B.slate,marginTop:2}}>מה היעד העסקי שלך?</p>
          </div>
          <button onClick={onClose} style={{...btn(),width:30,height:30,borderRadius:"50%",background:B.mist,color:B.slate,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>

        {/* progress */}
        <div style={{display:"flex",gap:4,padding:"14px 20px 0"}}>
          {["יעד","פרטים","Blueprint"].map((s,i)=>(
            <div key={s} style={{flex:1,textAlign:"center"}}>
              <div style={{height:3,borderRadius:99,background:i<=step?B.signal:B.mist,marginBottom:4,transition:"background .3s"}}/>
              <div style={{fontSize:10,color:i<=step?B.signal:B.slate,fontWeight:i<=step?600:400}}>{s}</div>
            </div>
          ))}
        </div>

        <div style={{padding:"20px 20px 36px"}}>
          {/* Step 0 — choose goal */}
          {step===0 && (
            <>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20}}>
                {GOALS.map(g => (
                  <button key={g.id} onClick={()=>setGoal(g.id)} style={{...btn(),padding:"14px 10px",borderRadius:12,background:goal===g.id?`${B.signal}12`:B.white,border:`1.5px solid ${goal===g.id?B.signal:B.mist}`,display:"flex",alignItems:"center",gap:10,textAlign:"right",boxShadow:"0 1px 6px rgba(0,0,0,.04)"}}>
                    <span style={{fontSize:22,flexShrink:0}}>{g.icon}</span>
                    <span style={{fontSize:13,fontWeight:600,color:goal===g.id?B.signal:B.ink,lineHeight:1.3}}>{g.label}</span>
                  </button>
                ))}
              </div>
              <button onClick={()=>goal&&setStep(1)} style={{...btn(),width:"100%",padding:"14px",background:goal?B.signal:"#C5BEB6",borderRadius:12,color:B.white,fontSize:15,fontWeight:600,fontFamily:"'Fraunces',serif",opacity:goal?1:.6}}>
                המשך →
              </button>
            </>
          )}

          {/* Step 1 — details */}
          {step===1 && (
            <>
              <div style={{background:B.white,borderRadius:14,padding:14,border:`1px solid ${B.mist}`,marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:28}}>{goalObj?.icon}</span>
                <div style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:700,color:B.ink}}>{goalObj?.label}</div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:20}}>
                {[
                  {k:"budget",  label:"מה התקציב שלך?",         ph:"לדוגמה: ₪200K, אין, גמיש"},
                  {k:"stage",   label:"באיזה שלב העסק שלך?",    ph:"רעיון / מוצר / עסק פעיל"},
                  {k:"missing", label:"מה חסר לך להגיע ליעד?",  ph:"כסף, ידע, קשרים, תפעול..."},
                  {k:"timeline",label:"תוך כמה זמן?",            ph:"3 חודשים / שנה / גמיש"},
                  {k:"area",    label:"באיזה אזור?",             ph:"תל אביב / כל הארץ..."},
                ].map(({k,label,ph}) => (
                  <div key={k}>
                    <label style={{fontSize:11,fontWeight:600,color:B.slate,textTransform:"uppercase",letterSpacing:.5,marginBottom:6,display:"block"}}>{label}</label>
                    <input value={answers[k]} onChange={e=>s(k,e.target.value)} placeholder={ph} style={fi}
                      onFocus={e=>e.target.style.borderColor=B.signal} onBlur={e=>e.target.style.borderColor=B.mist}/>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>setStep(0)} style={{...btn(),padding:"12px 20px",background:B.white,border:`1px solid ${B.mist}`,borderRadius:12,color:B.slate,fontSize:14}}>← חזור</button>
                <button onClick={buildBlueprint} style={{...btn(),flex:1,padding:"13px",background:B.signal,borderRadius:12,color:B.white,fontSize:15,fontWeight:600,fontFamily:"'Fraunces',serif"}}>
                  בנה Growth Blueprint ✦
                </button>
              </div>
            </>
          )}

          {/* Step 2 — blueprint */}
          {step===2 && blueprint && (
            <>
              {/* hero */}
              <div style={{background:B.signal,borderRadius:14,padding:20,marginBottom:16,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:-20,left:-20,width:100,height:100,borderRadius:"50%",background:"rgba(255,255,255,.08)"}}/>
                <div style={{position:"relative",zIndex:1}}>
                  <div style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,.7)",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Growth Blueprint</div>
                  <div style={{fontFamily:"'Fraunces',serif",fontSize:20,fontWeight:700,color:"#fff",lineHeight:1.3,marginBottom:8}}>{blueprint.title}</div>
                  <div style={{fontSize:13,color:"rgba(255,255,255,.85)",lineHeight:1.65}}>{blueprint.summary}</div>
                </div>
              </div>

              {/* needs */}
              <div style={{marginBottom:14}}>
                <div style={{fontSize:11,fontWeight:600,color:B.slate,textTransform:"uppercase",letterSpacing:.5,marginBottom:10}}>כדי להגיע לשם תצטרך</div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {blueprint.needs?.map((n,i) => (
                    <div key={i} style={{background:B.white,border:`1px solid ${B.mist}`,borderRadius:12,padding:"12px 14px",display:"flex",alignItems:"flex-start",gap:12,boxShadow:"0 1px 6px rgba(0,0,0,.04)"}}>
                      <span style={{fontSize:22,flexShrink:0}}>{n.icon}</span>
                      <div>
                        <div style={{fontSize:13,fontWeight:700,color:B.ink,marginBottom:2}}>{n.label}</div>
                        <div style={{fontSize:12,color:B.slate,lineHeight:1.5}}>{n.desc}</div>
                      </div>
                      <div style={{marginRight:"auto",flexShrink:0}}>
                        <button style={{...btn(),padding:"5px 12px",background:`${B.signal}12`,color:B.signal,borderRadius:99,fontSize:11,fontWeight:600,border:`1px solid ${B.signal}25`}}>
                          מצא →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* timeline + first step */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
                <div style={{background:B.white,border:`1px solid ${B.mist}`,borderRadius:12,padding:14}}>
                  <div style={{fontSize:10,fontWeight:600,color:B.slate,textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>ציר זמן</div>
                  <div style={{fontSize:13,color:B.ink,fontWeight:600,lineHeight:1.5}}>{blueprint.timeline}</div>
                </div>
                <div style={{background:`${B.signal}08`,border:`1px solid ${B.signal}25`,borderRadius:12,padding:14}}>
                  <div style={{fontSize:10,fontWeight:600,color:B.signal,textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>הצעד הבא</div>
                  <div style={{fontSize:13,color:B.ink,fontWeight:600,lineHeight:1.5}}>{blueprint.first_step}</div>
                </div>
              </div>

              <button onClick={onClose} style={{...btn(),width:"100%",padding:"14px",background:B.signal,borderRadius:12,color:B.white,fontSize:15,fontWeight:600,fontFamily:"'Fraunces',serif"}}>
                התחל למצוא התאמות →
              </button>
            </>
          )}

          {/* Loading */}
          {step===3 && loading && (
            <div style={{padding:"40px 0",textAlign:"center"}}>
              <div style={{fontFamily:"'Fraunces',serif",fontSize:18,fontWeight:700,color:B.ink,marginBottom:16}}>בונה את ה-Blueprint שלך...</div>
              <div style={{display:"flex",gap:5,justifyContent:"center"}}>
                {[0,1,2].map(i=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:B.signal,animation:`dot 1.4s ease infinite`,animationDelay:`${i*.2}s`}}/>)}
              </div>
            </div>
          )}

          {step===3 && !loading && blueprint && (
            // trigger step 2 display
            <>{setStep(2)}</>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── SUCCESS FEED ──────────────────────────────────────────── */
const SUCCESS_STORIES = [
  {id:1,emoji:"☕",a:"אורית ודוד",domain:"אוכל",result:"רשת קפה חדשה",days:4,value:"₪1.2M",city:"ת\"א"},
  {id:2,emoji:"💻",a:"ערן ומאיה",domain:"טכנולוגיה",result:"CTO נמצא",days:7,value:"אקוויטי 15%",city:"חיפה"},
  {id:3,emoji:"🏥",a:"ד\"ר שירה ורועי",domain:"בריאות",result:"השקעה גויסה",days:12,value:"₪4M",city:"ר\"ג"},
  {id:4,emoji:"🏗️",a:"משה ואלי",domain:"נדל\"ן",result:"עסקת שיפוץ נחתמה",days:3,value:"₪800K",city:"ירושלים"},
];

function SuccessFeed({onClose}) {
  return (
    <div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,.5)",backdropFilter:"blur(6px)",display:"flex",alignItems:"flex-end",justifyContent:"center"}}
      onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:B.canvas,width:"100%",maxWidth:540,borderRadius:"20px 20px 0 0",maxHeight:"88vh",overflow:"auto",animation:"slideUp .3s ease"}}>
        <div style={{padding:"18px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${B.mist}`}}>
          <div>
            <h2 style={{fontFamily:"'Fraunces',serif",fontSize:20,fontWeight:700,color:B.ink}}>🌟 סיפורי הצלחה</h2>
            <p style={{fontSize:12,color:B.slate,marginTop:2}}>עסקאות אמיתיות שנסגרו דרך Dealio</p>
          </div>
          <button onClick={onClose} style={{...btn(),width:30,height:30,borderRadius:"50%",background:B.mist,color:B.slate,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>

        {/* stats bar */}
        <div style={{display:"flex",borderBottom:`1px solid ${B.mist}`}}>
          {[["340+","עסקאות"],["₪18M+","ערך כולל"],["4.2","ימים בממוצע"]].map(([n,l],i)=>(
            <div key={l} style={{flex:1,padding:"14px 8px",textAlign:"center",borderRight:i<2?`1px solid ${B.mist}`:"none"}}>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:18,fontWeight:500,color:B.signal}}>{n}</div>
              <div style={{fontSize:10,color:B.slate,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{padding:"16px 16px 36px",display:"flex",flexDirection:"column",gap:12}}>
          {SUCCESS_STORIES.map((s,i) => (
            <div key={s.id} style={{background:B.white,borderRadius:14,padding:18,border:`1px solid ${B.mist}`,boxShadow:"0 2px 10px rgba(0,0,0,.05)",animation:`fadeUp .4s ease both`,animationDelay:`${i*.08}s`}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                <div style={{width:44,height:44,borderRadius:12,background:`${domainColor(s.domain)}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{s.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:700,color:B.ink}}>{s.a}</div>
                  <div style={{fontSize:11,color:B.slate}}>📍 {s.city} · {s.domain}</div>
                </div>
                <div style={{background:`${B.green}12`,color:B.green,borderRadius:99,padding:"4px 10px",fontSize:11,fontWeight:600,border:`1px solid ${B.green}25`}}>✅ נסגר</div>
              </div>

              <div style={{background:B.canvas,borderRadius:10,padding:12,marginBottom:12}}>
                <div style={{fontSize:14,fontWeight:600,color:B.ink,marginBottom:4}}>{s.result}</div>
                <div style={{display:"flex",gap:14}}>
                  <span style={{fontSize:12,color:B.slate}}>⏱ {s.days} ימים</span>
                  <span style={{fontSize:12,color:B.slate}}>💰 {s.value}</span>
                </div>
              </div>

              {/* journey mini */}
              <div style={{display:"flex",alignItems:"center",gap:4}}>
                {["פרסמו הזדמנות","התאמה נמצאה","Deal Room","נסגר 🎉"].map((step,i,arr)=>(
                  <div key={step} style={{display:"flex",alignItems:"center",gap:4,flex:i<arr.length-1?1:0}}>
                    <div style={{width:20,height:20,borderRadius:"50%",background:B.signal,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#fff",fontWeight:700,flexShrink:0}}>✓</div>
                    {i<arr.length-1&&<div style={{flex:1,height:2,background:`${B.signal}30`,borderRadius:99}}/>}
                  </div>
                ))}
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                {["פרסמו","התאמה","שיחה","סגירה 🎉"].map(l=><div key={l} style={{fontSize:9,color:B.slate,flex:1,textAlign:"center"}}>{l}</div>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── JOURNEY PROGRESS (Profile) ───────────────────────────── */
function JourneyProgress({profile}) {
  if(!profile?.goalTitle) return null;
  const pct = profile.journeyPct || 35;
  const done = profile.journeyDone || ["ספק נמצא"];
  const left = profile.journeyLeft || ["משקיע","זכיין נוסף"];

  return (
    <div style={{background:B.white,border:`1px solid ${B.mist}`,borderRadius:14,padding:18,boxShadow:"0 2px 10px rgba(0,0,0,.05)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
        <div>
          <div style={{fontSize:10,fontWeight:600,color:B.signal,textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>Dealio Journey</div>
          <div style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:700,color:B.ink}}>🎯 {profile.goalTitle}</div>
        </div>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:18,fontWeight:500,color:B.signal}}>{pct}%</div>
      </div>

      {/* progress bar */}
      <div style={{height:8,background:B.mist,borderRadius:99,marginBottom:16,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${pct}%`,background:B.signal,borderRadius:99,transition:"width .6s ease"}}/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <div>
          <div style={{fontSize:10,fontWeight:600,color:B.green,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>הושלם ✓</div>
          {done.map(d=><div key={d} style={{fontSize:12,color:B.ink,marginBottom:5,display:"flex",gap:5}}><span style={{color:B.green}}>✓</span>{d}</div>)}
        </div>
        <div>
          <div style={{fontSize:10,fontWeight:600,color:B.signal,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>חסר</div>
          {left.map(l=><div key={l} style={{fontSize:12,color:B.ink,marginBottom:5,display:"flex",gap:5}}><span style={{color:B.signal}}>◎</span>{l}</div>)}
        </div>
      </div>
    </div>
  );
}

/* ─── ROOT ──────────────────────────────────────────────────── */
const NAV=[{id:"home",icon:"🏠",label:"בית"},{id:"search",icon:"🔍",label:"חיפוש"},{id:"matches",icon:"🤝",label:"התאמות"},{id:"goal",icon:"🎯",label:"יעד"},{id:"profile",icon:"👤",label:"פרופיל"}];

export default function DealioApp() {
  const [onboarded,setOnboarded]=useState(false);
  const [tab,setTab]=useState("home");
  const [feed,setFeed]=useState(FEED_DATA);
  const [detail,setDetail]=useState(null);
  const [chat,setChat]=useState(null);
  const [showAdd,setShowAdd]=useState(false);
  const [showGoal,setShowGoal]=useState(false);
  const [showSuccess,setShowSuccess]=useState(false);
  const [profile,setProfile]=useState(null);

  const handleOnboard=data=>{setProfile({name:data.name||"משתמש",userType:data.userType||"entrepreneur",city:"תל אביב",bio:"",verified:false,verifiedMethod:"",hasAssets:data.hasAssets||[],seekingTypes:data.seekingTypes||[],domains:[],goalTitle:"",journeyPct:0,journeyDone:[],journeyLeft:[]});setOnboarded(true);};
  const openChat=o=>{setDetail(null);setChat(o);};

  if(!onboarded) return <><style>{CSS}</style><div style={{maxWidth:540,margin:"0 auto"}}><OnboardingScreen onDone={handleOnboard}/></div></>;
  if(chat) return <><style>{CSS}</style><div style={{maxWidth:540,margin:"0 auto"}}><DealRoom opp={chat} onBack={()=>setChat(null)}/></div></>;

  return (
    <>
      <style>{CSS}</style>
      <div style={{maxWidth:540,margin:"0 auto",minHeight:"100vh",background:B.canvas}}>
        {tab==="home"    && <HomeScreen    feed={feed} setFeed={setFeed} onView={setDetail} onAdd={()=>setShowAdd(true)} userName={profile?.name} onShowSuccess={()=>setShowSuccess(true)}/>}
        {tab==="search"  && <SearchScreen  feed={feed} onView={setDetail}/>}
        {tab==="matches" && <MatchesScreen feed={feed} onView={setDetail} onChat={openChat}/>}
        {tab==="goal"    && <GoalEngine    onClose={()=>setTab("home")}/>}
        {tab==="profile" && <ProfileScreen profile={profile} setProfile={setProfile} onGoal={()=>setShowGoal(true)}/>}

        {/* bottom nav */}
        <nav style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:540,background:B.white,borderTop:`1px solid ${B.mist}`,display:"flex",zIndex:50,paddingBottom:"env(safe-area-inset-bottom,0px)",boxShadow:"0 -2px 16px rgba(0,0,0,.06)"}}>
          {NAV.map(n=>{const a=tab===n.id;return(
            <button key={n.id} onClick={()=>setTab(n.id)} style={{...btn(),flex:1,padding:"11px 0 9px",display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"transparent"}}>
              <span style={{fontSize:n.id==="goal"?22:21,lineHeight:1,filter:a?"none":"grayscale(100%) opacity(45%)",transform:a?"scale(1.1)":"scale(1)",transition:"all .2s"}}>{n.icon}</span>
              <span style={{fontSize:10,fontWeight:a?600:400,color:a?B.signal:B.slate}}>{n.label}</span>
              {a&&<div style={{width:16,height:2,borderRadius:99,background:B.signal,marginTop:1}}/>}
            </button>
          );})}
        </nav>

        {detail      && <DetailModal  o={detail} onClose={()=>setDetail(null)} onChat={openChat}/>}
        {showAdd     && <AddModal     onClose={()=>setShowAdd(false)} onAdd={o=>{setFeed(p=>[o,...p]);setShowAdd(false);}}/>}
        {showGoal    && <GoalEngine   onClose={()=>setShowGoal(false)}/>}
        {showSuccess && <SuccessFeed  onClose={()=>setShowSuccess(false)}/>}
      </div>
    </>
  );
}
