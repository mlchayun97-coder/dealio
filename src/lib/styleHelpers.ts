import type { CSSProperties } from "react";
import { B } from "../theme/tokens";

export const btn = (x: CSSProperties = {}): CSSProperties => ({
  border: "none",
  cursor: "pointer",
  fontFamily: "inherit",
  transition: "all .18s cubic-bezier(.4,0,.2,1)",
  ...x,
});

export const domainColor = (d: string): string => B.dc[d] || B.signal;

interface GlassOptions {
  strong?: boolean; // more opaque — for content that needs higher text contrast
  subtle?: boolean; // more transparent — for large background panels
  hover?: boolean; // deeper shadow + lift, for the hovered state of a glass card
  radius?: number;
  padding?: string | number;
}

// The core frosted-glass surface used for nearly every card/panel/sheet in the app.
// Spread the result into a style object and override individual fields as needed.
export const glass = ({ strong, subtle, hover, radius = 16, padding }: GlassOptions = {}): CSSProperties => ({
  background: strong ? B.glass.bgStrong : subtle ? B.glass.bgSubtle : B.glass.bg,
  backdropFilter: B.glass.blur,
  WebkitBackdropFilter: B.glass.blur,
  border: `1px solid ${strong ? B.glass.borderStrong : B.glass.border}`,
  borderRadius: radius,
  boxShadow: hover ? B.glass.shadowHover : B.glass.shadow,
  transition: "transform .25s cubic-bezier(.16,1,.3,1), box-shadow .25s cubic-bezier(.16,1,.3,1), background .25s ease",
  ...(padding !== undefined ? { padding } : {}),
});

// Shared text-input style used across the Add/Goal/Verification forms — frosted too,
// so form sheets read as one glass surface instead of flat white boxes floating on it.
export const fieldInput: CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  background: "rgba(255,255,255,0.6)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  border: `1.5px solid ${B.glass.border}`,
  borderRadius: 12,
  color: B.ink,
  fontSize: 14,
  outline: "none",
  direction: "rtl",
  transition: "border-color .15s, box-shadow .15s, background .15s",
};

export const focusSignal = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.target.style.borderColor = B.signal;
  e.target.style.boxShadow = `0 0 0 4px ${B.signal}18`;
  e.target.style.background = "rgba(255,255,255,0.85)";
};
export const blurMist = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.target.style.borderColor = B.glass.border;
  e.target.style.boxShadow = "none";
  e.target.style.background = "rgba(255,255,255,0.6)";
};
