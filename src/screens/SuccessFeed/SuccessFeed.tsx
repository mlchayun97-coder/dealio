import { B } from "../../theme/tokens";
import { SUCCESS_STORIES } from "../../data/mock";
import { btn, domainColor, glass } from "../../lib/styleHelpers";

export function SuccessFeed({ onClose }: { onClose: () => void }) {
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
          maxHeight: "88vh",
          overflow: "auto",
          animation: "slideUp .3s ease",
        }}
      >
        <div style={{ padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.5)" }}>
          <div>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 700, color: B.ink }}>🌟 סיפורי הצלחה</h2>
            <p style={{ fontSize: 12, color: B.slate, marginTop: 2 }}>עסקאות אמיתיות שנסגרו דרך Dealio</p>
          </div>
          <button onClick={onClose} style={{ ...btn(), width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", color: B.slate, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
            ✕
          </button>
        </div>

        {/* stats bar */}
        <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.5)" }}>
          {(
            [
              ["340+", "עסקאות"],
              ["₪18M+", "ערך כולל"],
              ["4.2", "ימים בממוצע"],
            ] as const
          ).map(([n, l], i) => (
            <div key={l} style={{ flex: 1, padding: "14px 8px", textAlign: "center", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.5)" : "none" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 18, fontWeight: 500, color: B.signal }}>{n}</div>
              <div style={{ fontSize: 10, color: B.slate, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: "16px 16px 36px", display: "flex", flexDirection: "column", gap: 12 }}>
          {SUCCESS_STORIES.map((s, i) => (
            <div key={s.id} style={{ ...glass({ radius: 16, padding: 18 }), animation: `fadeUp .4s ease both`, animationDelay: `${i * 0.08}s` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${domainColor(s.domain)}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{s.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Fraunces',serif", fontSize: 15, fontWeight: 700, color: B.ink }}>{s.a}</div>
                  <div style={{ fontSize: 11, color: B.slate }}>
                    📍 {s.city} · {s.domain}
                  </div>
                </div>
                <div style={{ background: `${B.green}12`, color: B.green, borderRadius: 99, padding: "4px 10px", fontSize: 11, fontWeight: 600, border: `1px solid ${B.green}25` }}>✅ נסגר</div>
              </div>

              <div style={{ background: "rgba(255,255,255,0.4)", borderRadius: 10, padding: 12, marginBottom: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: B.ink, marginBottom: 4 }}>{s.result}</div>
                <div style={{ display: "flex", gap: 14 }}>
                  <span style={{ fontSize: 12, color: B.slate }}>⏱ {s.days} ימים</span>
                  <span style={{ fontSize: 12, color: B.slate }}>💰 {s.value}</span>
                </div>
              </div>

              {/* journey mini */}
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {["פרסמו הזדמנות", "התאמה נמצאה", "Deal Room", "נסגר 🎉"].map((step, i2, arr) => (
                  <div key={step} style={{ display: "flex", alignItems: "center", gap: 4, flex: i2 < arr.length - 1 ? 1 : 0 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: B.signal, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff", fontWeight: 700, flexShrink: 0 }}>✓</div>
                    {i2 < arr.length - 1 && <div style={{ flex: 1, height: 2, background: `${B.signal}30`, borderRadius: 99 }} />}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                {["פרסמו", "התאמה", "שיחה", "סגירה 🎉"].map((l) => (
                  <div key={l} style={{ fontSize: 9, color: B.slate, flex: 1, textAlign: "center" }}>
                    {l}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
