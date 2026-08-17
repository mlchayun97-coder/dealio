import { useEffect, useState } from "react";
import { B } from "../theme/tokens";
import { ASSETS } from "../data/mock";
import { btn, glass } from "../lib/styleHelpers";
import { analyzeOpportunity } from "../lib/api";
import type { Opportunity, OpportunityAnalysis } from "../types";
import { MatchChip } from "../components/shared/MatchChip";

export function DetailModal({ o, onClose, onChat }: { o: Opportunity; onClose: () => void; onChat: (o: Opportunity) => void }) {
  const [loading, setLoading] = useState(true);
  const [aiData, setAiData] = useState<OpportunityAnalysis | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await analyzeOpportunity(o);
        if (!cancelled) setAiData(data);
      } catch {
        if (!cancelled) setAiData({ summary: "לא זמין", pros: [], risks: [], opener: "" });
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [o.id]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(13,13,13,.45)", backdropFilter: "blur(8px)", display: "flex", alignItems: "flex-end", justifyContent: "center", animation: "fadeIn .2s ease" }} onClick={(e) => e.target === e.currentTarget && onClose()}>
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
        {/* hero banner */}
        <div style={{ background: o.g, padding: "28px 20px 24px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.2)" }} />
          <button
            onClick={onClose}
            style={{ ...btn(), position: "absolute", top: 16, left: 16, zIndex: 2, width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,.2)", backdropFilter: "blur(8px)", color: "#fff", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            ✕
          </button>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{o.emoji}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{o.author}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.75)" }}>{o.handle}</div>
              </div>
              <div style={{ marginRight: "auto" }}>
                <MatchChip score={o.score} />
              </div>
            </div>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: 8 }}>{o.title}</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.88)", lineHeight: 1.65 }}>{o.desc}</p>
          </div>
        </div>

        <div style={{ padding: "20px 20px 36px", display: "flex", flexDirection: "column", gap: 14 }}>
          {/* live stats */}
          <div style={{ ...glass({ radius: 14, padding: 14 }), display: "flex", gap: 20 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 20, fontWeight: 500, color: B.blue }}>{o.viewing}</div>
              <div style={{ fontSize: 10, color: B.slate }}>צופים</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 20, fontWeight: 500, color: B.green }}>{o.interested}</div>
              <div style={{ fontSize: 10, color: B.slate }}>מעוניינים</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 20, fontWeight: 500, color: B.warm }}>{o.likes}</div>
              <div style={{ fontSize: 10, color: B.slate }}>שמרו</div>
            </div>
            {o.chatting && (
              <div style={{ marginRight: "auto", alignSelf: "center", fontSize: 11, color: B.signal, fontWeight: 600, animation: "pulse 1.5s infinite" }}>
                💬 שיחה פעילה עם {o.chatWith}
              </div>
            )}
          </div>

          {/* reasons */}
          {o.reasons?.length > 0 && (
            <div style={{ background: `${B.green}10`, backdropFilter: "blur(12px)", border: `1px solid ${B.green}25`, borderRadius: 14, padding: 14 }}>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 13, fontWeight: 700, color: B.green, marginBottom: 10 }}>למה זו התאמה טובה</div>
              {o.reasons.map((r, i) => (
                <div key={i} style={{ fontSize: 13, color: B.ink, marginBottom: 6, display: "flex", gap: 8 }}>
                  <span style={{ color: B.green, fontWeight: 700 }}>✓</span>
                  {r}
                </div>
              ))}
            </div>
          )}

          {/* assets */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background: `${B.green}08`, border: `1px solid ${B.green}20`, borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: B.green, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>יש להם</div>
              {o.has?.map((k) => (
                <div key={k} style={{ fontSize: 12, color: B.ink, marginBottom: 5 }}>
                  {ASSETS[k]?.icon} {ASSETS[k]?.label}
                </div>
              ))}
            </div>
            <div style={{ background: `${B.signal}08`, border: `1px solid ${B.signal}20`, borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: B.signal, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>חסר להם</div>
              {o.needs?.map((k) => (
                <div key={k} style={{ fontSize: 12, color: B.ink, marginBottom: 5 }}>
                  {ASSETS[k]?.icon} {ASSETS[k]?.label}
                </div>
              ))}
            </div>
          </div>

          {/* AI */}
          <div style={glass({ radius: 14, padding: 16 })}>
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 13, fontWeight: 700, color: B.ink, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 20, height: 20, borderRadius: "50%", background: B.signal, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff" }}>✦</span>
              ניתוח Dealio AI
            </div>
            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[92, 68, 84].map((w, i) => (
                  <div
                    key={i}
                    style={{
                      height: 11,
                      width: `${w}%`,
                      borderRadius: 6,
                      background: `linear-gradient(90deg,${B.mist} 25%,#F1EFE9 37%,${B.mist} 63%)`,
                      backgroundSize: "400% 100%",
                      animation: "shimmer 1.6s ease-in-out infinite",
                    }}
                  />
                ))}
              </div>
            ) : (
              aiData && (
                <>
                  <p style={{ fontSize: 13, color: B.slate, lineHeight: 1.75, marginBottom: 12 }}>{aiData.summary}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                    {aiData.pros?.map((p, i) => (
                      <span key={i} style={{ background: `${B.green}12`, color: B.green, borderRadius: 99, padding: "3px 9px", fontSize: 11 }}>
                        ✓ {p}
                      </span>
                    ))}
                    {aiData.risks?.map((r, i) => (
                      <span key={i} style={{ background: `${B.warm}18`, color: "#8B6914", borderRadius: 99, padding: "3px 9px", fontSize: 11 }}>
                        ⚠ {r}
                      </span>
                    ))}
                  </div>
                  {aiData.opener && (
                    <div style={{ background: "rgba(255,255,255,0.4)", borderRadius: 10, padding: 12, border: `1px solid ${B.glass.border}` }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: B.slate, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 5 }}>פתיחת שיחה מוצעת</div>
                      <div style={{ fontSize: 13, color: B.ink, lineHeight: 1.65 }}>{aiData.opener}</div>
                    </div>
                  )}
                </>
              )
            )}
          </div>

          <button
            onClick={() => {
              onClose();
              onChat(o);
            }}
            style={{ ...btn(), padding: "15px", background: "linear-gradient(135deg,#E8402A,#FF6B4A)", borderRadius: 14, color: B.white, fontSize: 15, fontWeight: 600, fontFamily: "'Fraunces',serif", boxShadow: "0 8px 26px rgba(232,64,42,.32)" }}
          >
            פתח Deal Room 🤝
          </button>
        </div>
      </div>
    </div>
  );
}
