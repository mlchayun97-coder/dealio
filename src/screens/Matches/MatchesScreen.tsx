import { B } from "../../theme/tokens";
import { btn, domainColor, glass } from "../../lib/styleHelpers";
import type { Opportunity } from "../../types";
import { MatchChip } from "../../components/shared/MatchChip";

interface MatchesScreenProps {
  feed: Opportunity[];
  onView: (o: Opportunity) => void;
  onChat: (o: Opportunity) => void;
}

export function MatchesScreen({ feed, onView, onChat }: MatchesScreenProps) {
  const sorted = [...feed].sort((a, b) => b.score - a.score);
  const top = sorted[0];
  return (
    <div style={{ paddingBottom: 90 }}>
      <div style={{ padding: "16px 16px 12px" }}>
        <div style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 700, color: B.ink, marginBottom: 4 }}>ההתאמות שלי</div>
        <div style={{ fontSize: 13, color: B.slate }}>ממוינות לפי ציון התאמה</div>
      </div>
      <div style={{ padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {top && (
          <div
            style={{
              background: "linear-gradient(135deg,#E8402A,#FF6B4A)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: 20,
              padding: 20,
              position: "relative",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.25)",
              boxShadow: "0 16px 44px rgba(232,64,42,.28), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            <div style={{ position: "absolute", top: -30, left: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,.1)", filter: "blur(2px)" }} />
            <div style={{ position: "absolute", bottom: -40, right: -20, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,.06)", filter: "blur(4px)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.75)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
                ההתאמה הטובה ביותר
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                  {top.emoji}
                </div>
                <div>
                  <div style={{ fontFamily: "'Fraunces',serif", fontSize: 16, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{top.title}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.75)" }}>
                    {top.author} · {top.city}
                  </div>
                </div>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,.2)", borderRadius: 99, padding: "4px 12px", marginBottom: 14 }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 500, color: "#fff" }}>{top.score}% match</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => onView(top)} style={{ ...btn(), flex: 1, padding: "11px 0", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderRadius: 12, color: B.signal, fontSize: 13, fontWeight: 600 }}>
                  בדוק התאמה
                </button>
                <button
                  onClick={() => onChat(top)}
                  style={{ ...btn(), flex: 1, padding: "11px 0", background: "rgba(255,255,255,.18)", backdropFilter: "blur(8px)", borderRadius: 12, color: "#fff", fontSize: 13, fontWeight: 600, border: "1px solid rgba(255,255,255,.35)" }}
                >
                  פתח שיחה
                </button>
              </div>
            </div>
          </div>
        )}
        {sorted.slice(1).map((o, i) => (
          <div
            key={o.id}
            onClick={() => onView(o)}
            style={{
              ...glass({ radius: 14, padding: "14px 16px" }),
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 12,
              animation: `fadeUp .3s ease both`,
              animationDelay: `${i * 0.06}s`,
              borderLeft: `3px solid ${domainColor(o.domain)}`,
            }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 10, background: `${domainColor(o.domain)}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
              {o.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 14, fontWeight: 700, color: B.ink, lineHeight: 1.3, marginBottom: 3 }}>{o.title}</div>
              <div style={{ fontSize: 11, color: B.slate }}>
                📍 {o.city} · {o.domain}
              </div>
            </div>
            <MatchChip score={o.score} />
          </div>
        ))}
      </div>
    </div>
  );
}
