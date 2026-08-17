/* ─── DEALIO BRAND TOKENS ───────────────────────────────────── */
export const B = {
  ink: "#0D0D0D",
  canvas: "#F7F4EF",
  card: "#FFFFFF",
  signal: "#E8402A",
  warm: "#F2C94C",
  slate: "#4A4A5A",
  mist: "#E8E5DF",
  white: "#FFFFFF",
  green: "#2A9D6A",
  blue: "#2A6FE8",
  // domain colors
  dc: {
    בריאות: "#2A8FE8",
    אוכל: "#E8782A",
    אירועים: "#E82A8F",
    טכנולוגיה: "#7A2AE8",
    'נדל"ן': "#2AE87A",
    שירותים: "#2AE8D4",
    חינוך: "#E8C02A",
    פיננסים: "#2A4AE8",
  } as Record<string, string>,
  // glassmorphism surface system — soft frosted panels over the mesh-gradient
  // backdrop (see theme/global.css). Use `glass()` from lib/styleHelpers for
  // the common cases; these raw tokens are for one-off tuning.
  glass: {
    bg: "rgba(255,255,255,0.46)",
    bgStrong: "rgba(255,255,255,0.68)",
    bgSubtle: "rgba(255,255,255,0.30)",
    bgDark: "rgba(13,13,13,0.55)",
    border: "rgba(255,255,255,0.7)",
    borderStrong: "rgba(255,255,255,0.85)",
    blur: "blur(24px) saturate(190%)",
    blurSoft: "blur(14px) saturate(170%)",
    shadow: "0 8px 32px rgba(31,25,60,0.16), inset 0 1px 0 rgba(255,255,255,0.7)",
    shadowHover: "0 20px 56px rgba(31,25,60,0.24), inset 0 1px 0 rgba(255,255,255,0.8)",
    shadowFloat: "0 14px 44px rgba(31,25,60,0.20), inset 0 1px 0 rgba(255,255,255,0.6)",
  },
};

export const GRADIENTS = [
  "linear-gradient(135deg,#E8402A,#FF6B35)",
  "linear-gradient(135deg,#7A2AE8,#2A6FE8)",
  "linear-gradient(135deg,#2A9D6A,#2AE8D4)",
  "linear-gradient(135deg,#E82A8F,#7A2AE8)",
  "linear-gradient(135deg,#E8C02A,#E8782A)",
  "linear-gradient(135deg,#2A6FE8,#2AE8D4)",
  "linear-gradient(135deg,#2AE87A,#2A9D6A)",
];
