import { useState } from "react";
import { B } from "../theme/tokens";
import { blurMist, btn, focusSignal } from "../lib/styleHelpers";

interface VerifyResult {
  method: string;
  value: string;
}

const OPTIONS = [
  { id: "email", icon: "📧", label: "אימייל", desc: "אימות בסיסי", color: B.blue },
  { id: "business", icon: "📋", label: "עסק רשום", desc: "תעודת עסק / ח.פ.", color: B.green },
  { id: "linkedin", icon: "💼", label: "LinkedIn", desc: "קישור פרופיל", color: "#0A66C2" },
  { id: "portfolio", icon: "🎨", label: "פורטפוליו", desc: "אתר / תיק עבודות", color: B.signal },
];

export function VerificationModal({ onClose, onVerify }: { onClose: () => void; onVerify: (data: VerifyResult) => void }) {
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const [input, setInput] = useState("");

  const done = () => {
    if (sel && (sel === "business" || input.trim())) {
      onVerify({ method: sel, value: input || "uploaded" });
      onClose();
    }
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(13,13,13,.5)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 20px" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "rgba(247,244,239,0.7)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.55)",
          boxShadow: B.glass.shadowFloat,
          borderRadius: 22,
          padding: 24,
          width: "100%",
          maxWidth: 400,
          animation: "fadeUp .3s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 18, fontWeight: 700, color: B.ink }}>אימות זהות</h2>
            <p style={{ fontSize: 12, color: B.slate, marginTop: 3 }}>בנה אמינות ב-Dealio</p>
          </div>
          <button onClick={onClose} style={{ ...btn(), width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", color: B.slate, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>
            ✕
          </button>
        </div>
        {step === 0 ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
              {OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSel(opt.id);
                    setStep(1);
                  }}
                  style={{ ...btn(), padding: 14, borderRadius: 14, background: "rgba(255,255,255,0.55)", backdropFilter: "blur(10px)", border: `1.5px solid ${opt.color}45`, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, boxShadow: "0 1px 6px rgba(0,0,0,.04)" }}
                >
                  <span style={{ fontSize: 24 }}>{opt.icon}</span>
                  <div style={{ fontSize: 12, fontWeight: 600, color: B.ink }}>{opt.label}</div>
                  <div style={{ fontSize: 10, color: B.slate }}>{opt.desc}</div>
                </button>
              ))}
            </div>
            <div style={{ background: `${B.green}10`, border: `1px solid ${B.green}25`, borderRadius: 10, padding: 12, fontSize: 11, color: B.slate, lineHeight: 1.6 }}>
              <strong style={{ color: B.green }}>למה לאמת?</strong> משתמשים מאומתים מקבלים 3× יותר פניות.
            </div>
          </>
        ) : (
          <>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: B.slate, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8, display: "block" }}>
                {sel === "business" ? "העלה תעודת עסק" : sel === "linkedin" ? "קישור LinkedIn" : sel === "portfolio" ? "קישור לפורטפוליו" : "אימייל"}
              </label>
              {sel === "business" ? (
                <div
                  onClick={() => setInput("uploaded")}
                  style={{ border: `2px dashed ${input ? B.green : B.glass.border}`, borderRadius: 12, padding: 20, textAlign: "center", cursor: "pointer", background: input ? `${B.green}10` : "rgba(255,255,255,0.35)", transition: "all .2s" }}
                >
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{input ? "✅" : "📸"}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: input ? B.green : B.ink }}>{input ? "קובץ נבחר" : "לחץ להעלאה"}</div>
                </div>
              ) : (
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={sel === "linkedin" ? "https://linkedin.com/in/..." : sel === "portfolio" ? "https://mysite.com" : "your@email.com"}
                  style={{ width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", border: `1.5px solid ${B.glass.border}`, borderRadius: 12, color: B.ink, fontSize: 14, outline: "none", direction: "ltr", transition: "border-color .15s, background .15s" }}
                  onFocus={focusSignal}
                  onBlur={blurMist}
                />
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setStep(0)} style={{ ...btn(), flex: 1, padding: "11px 0", background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)", border: `1px solid ${B.glass.border}`, borderRadius: 12, color: B.slate, fontSize: 14 }}>
                ← חזור
              </button>
              <button
                onClick={done}
                disabled={!input}
                style={{ ...btn(), flex: 1, padding: "11px 0", background: input ? B.green : "#C5BEB6", borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 600, opacity: input ? 1 : 0.6, boxShadow: input ? "0 4px 14px rgba(42,157,106,.3)" : "none" }}
              >
                אמת ✓
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
