import { useState } from "react";
import { B, GRADIENTS } from "../theme/tokens";
import { ASSETS, DOMAINS, OPP_TYPES } from "../data/mock";
import { blurMist, btn, domainColor, fieldInput, focusSignal } from "../lib/styleHelpers";
import type { AssetKey, Opportunity } from "../types";

interface AddForm {
  title: string;
  type: string;
  domain: string;
  desc: string;
  city: string;
  model: string;
  has: AssetKey[];
  needs: AssetKey[];
}

const EMPTY: AddForm = { title: "", type: "", domain: "", desc: "", city: "", model: "", has: [], needs: [] };

export function AddModal({ onClose, onAdd }: { onClose: () => void; onAdd: (o: Opportunity) => void }) {
  const [f, setF] = useState<AddForm>(EMPTY);
  const s = <K extends keyof AddForm>(k: K, v: AddForm[K]) => setF((p) => ({ ...p, [k]: v }));
  const tog = (k: AssetKey, field: "has" | "needs") =>
    setF((p) => ({ ...p, [field]: p[field].includes(k) ? p[field].filter((x) => x !== k) : [...p[field], k] }));

  const submit = () => {
    if (!f.title || !f.domain) return;
    onAdd({
      id: Date.now(),
      emoji: "🆕",
      author: "אתה",
      handle: "@me",
      g: GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)],
      city: f.city || "ישראל",
      domain: f.domain,
      model: f.model || "לדיון",
      oppType: f.type || "הזדמנות",
      seeking: "שותף",
      title: f.title,
      desc: f.desc || "",
      has: f.has,
      needs: f.needs,
      score: Math.floor(Math.random() * 20) + 65,
      likes: 0,
      saved: false,
      liked: false,
      time: "עכשיו",
      verified: false,
      verifiedMethod: "",
      viewing: 0,
      interested: 0,
      chatting: false,
      chatWith: "",
      reasons: [],
    });
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(13,13,13,.45)", backdropFilter: "blur(8px)", display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div
        style={{
          background: "rgba(247,244,239,0.66)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.5)",
          width: "100%",
          maxWidth: 540,
          borderRadius: "24px 24px 0 0",
          maxHeight: "90vh",
          overflow: "auto",
          animation: "slideUp .3s ease",
        }}
      >
        <div style={{ padding: "18px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 700, color: B.ink }}>פרסם הזדמנות</h2>
          <button onClick={onClose} style={{ ...btn(), width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", color: B.slate, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
            ✕
          </button>
        </div>
        <div style={{ padding: "0 20px 36px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: B.slate, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6, display: "block" }}>כותרת *</label>
            <input
              value={f.title}
              onChange={(e) => s("title", e.target.value)}
              placeholder="מה ההזדמנות שלך?"
              style={fieldInput}
              onFocus={focusSignal}
              onBlur={blurMist}
            />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: B.slate, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6, display: "block" }}>תיאור</label>
            <textarea value={f.desc} onChange={(e) => s("desc", e.target.value)} placeholder="ספר בכמה משפטים..." style={{ ...fieldInput, minHeight: 80, resize: "vertical" }} />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: B.slate, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8, display: "block" }}>סוג</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {OPP_TYPES.map((t) => (
                <button key={t} onClick={() => s("type", t)} style={{ ...btn(), padding: "6px 14px", borderRadius: 99, fontSize: 12, background: f.type === t ? B.ink : "transparent", color: f.type === t ? B.white : B.slate, border: `1px solid ${f.type === t ? B.ink : B.mist}` }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: B.slate, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8, display: "block" }}>תחום *</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {DOMAINS.map((d) => (
                <button
                  key={d}
                  onClick={() => s("domain", d)}
                  style={{ ...btn(), padding: "6px 14px", borderRadius: 99, fontSize: 12, background: f.domain === d ? `${domainColor(d)}15` : "transparent", color: f.domain === d ? domainColor(d) : B.slate, border: `1px solid ${f.domain === d ? domainColor(d) : B.mist}` }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: B.slate, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6, display: "block" }}>עיר</label>
              <input value={f.city} onChange={(e) => s("city", e.target.value)} placeholder="תל אביב..." style={fieldInput} onFocus={focusSignal} onBlur={blurMist} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: B.slate, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6, display: "block" }}>מודל</label>
              <input value={f.model} onChange={(e) => s("model", e.target.value)} placeholder="חלוקת רווחים..." style={fieldInput} onFocus={focusSignal} onBlur={blurMist} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: B.green, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8, display: "block" }}>יש לי</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {(Object.entries(ASSETS) as [AssetKey, (typeof ASSETS)[AssetKey]][]).map(([k, { icon, label }]) => {
                const on = f.has.includes(k);
                return (
                  <button key={k} onClick={() => tog(k, "has")} style={{ ...btn(), padding: "6px 12px", borderRadius: 99, fontSize: 12, background: on ? `${B.green}12` : "transparent", color: on ? B.green : B.slate, border: `1px solid ${on ? B.green : B.mist}` }}>
                    {icon} {label}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: B.signal, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8, display: "block" }}>מחפש</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {(Object.entries(ASSETS) as [AssetKey, (typeof ASSETS)[AssetKey]][]).map(([k, { icon, label }]) => {
                const on = f.needs.includes(k);
                return (
                  <button key={k} onClick={() => tog(k, "needs")} style={{ ...btn(), padding: "6px 12px", borderRadius: 99, fontSize: 12, background: on ? `${B.signal}10` : "transparent", color: on ? B.signal : B.slate, border: `1px solid ${on ? B.signal : B.mist}` }}>
                    {icon} {label}
                  </button>
                );
              })}
            </div>
          </div>
          <button
            onClick={submit}
            style={{
              ...btn(),
              padding: "14px",
              background: f.title && f.domain ? "linear-gradient(135deg,#E8402A,#FF6B4A)" : "#C5BEB6",
              borderRadius: 14,
              color: B.white,
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "'Fraunces',serif",
              marginTop: 4,
              boxShadow: f.title && f.domain ? "0 8px 26px rgba(232,64,42,.32)" : "none",
            }}
          >
            פרסם הזדמנות
          </button>
        </div>
      </div>
    </div>
  );
}
