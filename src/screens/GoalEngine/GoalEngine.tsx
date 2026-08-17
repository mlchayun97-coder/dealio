import { useEffect, useState } from "react";
import { B } from "../../theme/tokens";
import { GOALS } from "../../data/mock";
import { btn, blurMist, fieldInput, focusSignal, glass } from "../../lib/styleHelpers";
import { buildBlueprint } from "../../lib/api";
import type { Blueprint, GoalAnswers } from "../../types";

export function GoalEngine({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<string | null>(null);
  const [answers, setAnswers] = useState<GoalAnswers>({ budget: "", stage: "", missing: "", timeline: "", area: "" });
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [loading, setLoading] = useState(false);

  const s = <K extends keyof GoalAnswers>(k: K, v: GoalAnswers[K]) => setAnswers((p) => ({ ...p, [k]: v }));

  const goalObj = GOALS.find((g) => g.id === goal);

  const startBuild = async () => {
    setLoading(true);
    setStep(3);
    try {
      const bp = await buildBlueprint(goalObj?.label || "", answers);
      setBlueprint(bp);
    } catch {
      setBlueprint({ title: "Blueprint", summary: "לא ניתן לטעון", needs: [], timeline: "", first_step: "" });
    }
    setLoading(false);
  };

  // once the blueprint finishes loading, move from the loading step to the results step
  useEffect(() => {
    if (step === 3 && !loading && blueprint) setStep(2);
  }, [step, loading, blueprint]);

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
        <div style={{ padding: "18px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <div>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 700, color: B.ink }}>Goal Engine</h2>
            <p style={{ fontSize: 12, color: B.slate, marginTop: 2 }}>מה היעד העסקי שלך?</p>
          </div>
          <button onClick={onClose} style={{ ...btn(), width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", color: B.slate, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
            ✕
          </button>
        </div>

        {/* progress */}
        <div style={{ display: "flex", gap: 4, padding: "14px 20px 0" }}>
          {["יעד", "פרטים", "Blueprint"].map((s2, i) => (
            <div key={s2} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ height: 3, borderRadius: 99, background: i <= step ? B.signal : "rgba(13,13,13,.12)", marginBottom: 4, transition: "background .3s" }} />
              <div style={{ fontSize: 10, color: i <= step ? B.signal : B.slate, fontWeight: i <= step ? 600 : 400 }}>{s2}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: "20px 20px 36px" }}>
          {/* Step 0 — choose goal */}
          {step === 0 && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
                {GOALS.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    style={{
                      ...btn(),
                      ...glass({ radius: 14, padding: "14px 10px" }),
                      background: goal === g.id ? "rgba(232,64,42,0.12)" : B.glass.bg,
                      border: `1.5px solid ${goal === g.id ? B.signal : B.glass.border}`,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      textAlign: "right",
                    }}
                  >
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{g.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: goal === g.id ? B.signal : B.ink, lineHeight: 1.3 }}>{g.label}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => goal && setStep(1)}
                style={{ ...btn(), width: "100%", padding: "14px", background: goal ? "linear-gradient(135deg,#E8402A,#FF6B4A)" : "#C5BEB6", borderRadius: 14, color: B.white, fontSize: 15, fontWeight: 600, fontFamily: "'Fraunces',serif", opacity: goal ? 1 : 0.6, boxShadow: goal ? "0 8px 26px rgba(232,64,42,.32)" : "none" }}
              >
                המשך →
              </button>
            </>
          )}

          {/* Step 1 — details */}
          {step === 1 && (
            <>
              <div style={{ ...glass({ radius: 16, padding: 14 }), marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 28 }}>{goalObj?.icon}</span>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 15, fontWeight: 700, color: B.ink }}>{goalObj?.label}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                {(
                  [
                    { k: "budget", label: "מה התקציב שלך?", ph: "לדוגמה: ₪200K, אין, גמיש" },
                    { k: "stage", label: "באיזה שלב העסק שלך?", ph: "רעיון / מוצר / עסק פעיל" },
                    { k: "missing", label: "מה חסר לך להגיע ליעד?", ph: "כסף, ידע, קשרים, תפעול..." },
                    { k: "timeline", label: "תוך כמה זמן?", ph: "3 חודשים / שנה / גמיש" },
                    { k: "area", label: "באיזה אזור?", ph: "תל אביב / כל הארץ..." },
                  ] as const
                ).map(({ k, label, ph }) => (
                  <div key={k}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: B.slate, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6, display: "block" }}>{label}</label>
                    <input value={answers[k]} onChange={(e) => s(k, e.target.value)} placeholder={ph} style={fieldInput} onFocus={focusSignal} onBlur={blurMist} />
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(0)} style={{ ...btn(), padding: "12px 20px", background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)", border: `1px solid ${B.glass.border}`, borderRadius: 14, color: B.slate, fontSize: 14 }}>
                  ← חזור
                </button>
                <button onClick={startBuild} style={{ ...btn(), flex: 1, padding: "13px", background: "linear-gradient(135deg,#E8402A,#FF6B4A)", borderRadius: 14, color: B.white, fontSize: 15, fontWeight: 600, fontFamily: "'Fraunces',serif", boxShadow: "0 8px 26px rgba(232,64,42,.32)" }}>
                  בנה Growth Blueprint ✦
                </button>
              </div>
            </>
          )}

          {/* Step 2 — blueprint */}
          {step === 2 && blueprint && (
            <>
              {/* hero */}
              <div style={{ background: "linear-gradient(135deg,#E8402A,#FF6B4A)", border: "1px solid rgba(255,255,255,0.25)", boxShadow: "0 12px 36px rgba(232,64,42,.28), inset 0 1px 0 rgba(255,255,255,0.3)", borderRadius: 18, padding: 20, marginBottom: 16, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -20, left: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,.1)", filter: "blur(2px)" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,.7)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Growth Blueprint</div>
                  <div style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: 8 }}>{blueprint.title}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,.85)", lineHeight: 1.65 }}>{blueprint.summary}</div>
                </div>
              </div>

              {/* needs */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: B.slate, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>כדי להגיע לשם תצטרך</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {blueprint.needs?.map((n, i) => (
                    <div key={i} style={{ ...glass({ radius: 14, padding: "12px 14px" }), display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <span style={{ fontSize: 22, flexShrink: 0 }}>{n.icon}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: B.ink, marginBottom: 2 }}>{n.label}</div>
                        <div style={{ fontSize: 12, color: B.slate, lineHeight: 1.5 }}>{n.desc}</div>
                      </div>
                      <div style={{ marginRight: "auto", flexShrink: 0 }}>
                        <button style={{ ...btn(), padding: "5px 12px", background: "rgba(232,64,42,0.12)", color: B.signal, borderRadius: 99, fontSize: 11, fontWeight: 600, border: `1px solid ${B.signal}25` }}>
                          מצא →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* timeline + first step */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                <div style={glass({ radius: 14, padding: 14 })}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: B.slate, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>ציר זמן</div>
                  <div style={{ fontSize: 13, color: B.ink, fontWeight: 600, lineHeight: 1.5 }}>{blueprint.timeline}</div>
                </div>
                <div style={{ ...glass({ radius: 14, padding: 14 }), borderTop: `2px solid ${B.signal}` }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: B.signal, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>הצעד הבא</div>
                  <div style={{ fontSize: 13, color: B.ink, fontWeight: 600, lineHeight: 1.5 }}>{blueprint.first_step}</div>
                </div>
              </div>

              <button onClick={onClose} style={{ ...btn(), width: "100%", padding: "14px", background: "linear-gradient(135deg,#E8402A,#FF6B4A)", borderRadius: 14, color: B.white, fontSize: 15, fontWeight: 600, fontFamily: "'Fraunces',serif", boxShadow: "0 8px 26px rgba(232,64,42,.32)" }}>
                התחל למצוא התאמות →
              </button>
            </>
          )}

          {/* Loading */}
          {step === 3 && loading && (
            <div style={{ padding: "40px 0", textAlign: "center" }}>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 18, fontWeight: 700, color: B.ink, marginBottom: 16 }}>בונה את ה-Blueprint שלך...</div>
              <div style={{ display: "flex", gap: 5, justifyContent: "center" }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: B.signal, animation: `dot 1.4s ease infinite`, animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
