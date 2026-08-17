import { useState } from "react";
import { B } from "../../theme/tokens";
import { ASSETS, FEED_DATA, SEEKING_LABELS, USER_TYPES } from "../../data/mock";
import { btn, domainColor, glass } from "../../lib/styleHelpers";
import type { AssetKey, OnboardingData } from "../../types";
import { Logo } from "../../components/shared/Logo";
import { AvatarStack } from "../../components/shared/AvatarStack";
import { MatchChip } from "../../components/shared/MatchChip";
import { OnbStep } from "./OnbStep";

export function OnboardingScreen({ onDone }: { onDone: (data: OnboardingData) => void }) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const [data, setData] = useState<OnboardingData>({ name: "", userType: "", hasAssets: [], seekingTypes: [] });

  const s = <K extends keyof OnboardingData>(k: K, v: OnboardingData[K]) => setData((p) => ({ ...p, [k]: v }));
  const togAsset = (k: AssetKey) =>
    setData((p) => ({ ...p, hasAssets: p.hasAssets.includes(k) ? p.hasAssets.filter((x) => x !== k) : [...p.hasAssets, k] }));
  const togSeeking = (l: string) =>
    setData((p) => ({
      ...p,
      seekingTypes: p.seekingTypes.includes(l) ? p.seekingTypes.filter((x) => x !== l) : [...p.seekingTypes, l],
    }));
  const go = (n: number) => {
    setDir(n > step ? "fwd" : "back");
    setStep(n);
  };
  const chosenType = USER_TYPES.find((t) => t.id === data.userType);

  // Landing
  if (step === 0)
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "48px 24px 32px" }}>
          <div style={{ animation: "fadeUp .5s cubic-bezier(.16,1,.3,1) both" }}>
            <Logo size={28} />
          </div>

          <div style={{ marginTop: 36, marginBottom: 18, animation: "fadeUp .5s cubic-bezier(.16,1,.3,1) .06s both" }}>
            <AvatarStack />
          </div>

          <h1
            style={{
              fontFamily: "'Fraunces',serif",
              fontSize: 38,
              fontWeight: 700,
              lineHeight: 1.16,
              color: B.ink,
              marginBottom: 14,
              letterSpacing: -0.8,
              animation: "fadeUp .55s cubic-bezier(.16,1,.3,1) .12s both",
            }}
          >
            מצא מי מחפש
            <br />
            <em style={{ color: B.signal, fontStyle: "italic" }}>בדיוק</em> מה שיש לך
          </h1>
          <p
            style={{
              fontSize: 16.5,
              color: B.slate,
              lineHeight: 1.7,
              marginBottom: 28,
              maxWidth: 400,
              animation: "fadeUp .55s cubic-bezier(.16,1,.3,1) .18s both",
            }}
          >
            עסקים, אנשי מקצוע ומשקיעים — מתחברים על בסיס מה שיש ומה שחסר. לא קורות חיים.
          </p>

          <div style={{ display: "flex", gap: 10, marginBottom: 32, animation: "fadeUp .55s cubic-bezier(.16,1,.3,1) .24s both" }}>
            {([
              ["2,400+", "עסקים"],
              ["340+", "שיתופי פעולה"],
              ["₪18M+", "ערך"],
            ] as const).map(([n, l]) => (
              <div key={l} style={{ flex: 1, ...glass({ radius: 12, padding: "11px 8px" }), textAlign: "center" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 500, color: B.ink }}>{n}</div>
                <div style={{ fontSize: 10, color: B.slate, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* preview */}
          <div style={{ animation: "fadeUp .55s cubic-bezier(.16,1,.3,1) .3s both" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: B.slate, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 }}>
              הזדמנויות פעילות עכשיו
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {FEED_DATA.slice(0, 2).map((o) => (
                <div
                  key={o.id}
                  style={{
                    ...glass({ radius: 12, padding: "12px 14px" }),
                    borderLeft: `3px solid ${domainColor(o.domain)}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      background: `${domainColor(o.domain)}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      flexShrink: 0,
                    }}
                  >
                    {o.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: B.ink, lineHeight: 1.3 }}>{o.title}</div>
                    <div style={{ fontSize: 11, color: B.slate }}>📍 {o.city}</div>
                  </div>
                  <MatchChip score={o.score} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: "0 24px 40px", marginTop: "auto", animation: "fadeUp .5s cubic-bezier(.16,1,.3,1) .36s both" }}>
          <button
            onClick={() => go(1)}
            style={{
              ...btn(),
              width: "100%",
              padding: "16px",
              background: "linear-gradient(135deg,#E8402A,#FF6B4A)",
              borderRadius: 14,
              color: B.white,
              fontSize: 16,
              fontWeight: 600,
              fontFamily: "'Fraunces',serif",
              marginBottom: 14,
              boxShadow: "0 10px 32px rgba(232,64,42,.35)",
            }}
          >
            הצטרף — בחינם
          </button>
          <button
            onClick={() => onDone({ name: "אורח", userType: "entrepreneur", hasAssets: [], seekingTypes: [] })}
            style={{
              ...btn(),
              width: "100%",
              padding: "6px",
              background: "none",
              border: "none",
              color: B.slate,
              fontSize: 13.5,
              fontWeight: 500,
              textDecoration: "underline",
              textUnderlineOffset: 3,
              textDecorationColor: B.mist,
            }}
          >
            כניסה ישירה לפיד
          </button>
        </div>
      </div>
    );

  // Steps 1-4
  const steps = [
    <OnbStep key={1} title="מה שמך?" sub="איך נקרא לך בדאליו" step={1} total={4} dir={dir} onBack={() => go(0)} onNext={() => data.name.trim() && go(2)} ok={!!data.name.trim()}>
      <input
        autoFocus
        value={data.name}
        onChange={(e) => s("name", e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && data.name.trim() && go(2)}
        placeholder="שם מלא"
        style={{
          width: "100%",
          padding: "16px 18px",
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: `1.5px solid ${B.glass.border}`,
          borderRadius: 14,
          color: B.ink,
          fontSize: 18,
          fontFamily: "'Fraunces',serif",
          outline: "none",
          direction: "rtl",
          transition: "border-color .18s, box-shadow .18s, background .18s",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = B.signal;
          e.target.style.boxShadow = `0 0 0 4px ${B.signal}12`;
          e.target.style.background = "rgba(255,255,255,0.85)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = B.glass.border;
          e.target.style.boxShadow = "none";
          e.target.style.background = "rgba(255,255,255,0.6)";
        }}
      />
      <p style={{ fontSize: 12.5, color: B.slate, marginTop: 10 }}>זה איך משתמשים אחרים יכירו אותך</p>
    </OnbStep>,

    <OnbStep key={2} title="מי אתה?" sub="בחר את התפקיד שמתאים לך" step={2} total={4} dir={dir} onBack={() => go(1)} onNext={() => data.userType && go(3)} ok={!!data.userType}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {USER_TYPES.map((t) => {
          const on = data.userType === t.id;
          return (
            <button
              key={t.id}
              onClick={() => s("userType", t.id)}
              style={{
                ...btn(),
                ...glass({ radius: 14, padding: "18px 12px" }),
                position: "relative",
                background: on ? "rgba(232,64,42,0.12)" : B.glass.bg,
                border: `1.5px solid ${on ? B.signal : B.glass.border}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                boxShadow: on ? `${B.glass.shadow}, 0 8px 20px ${B.signal}22` : B.glass.shadow,
                transform: on ? "translateY(-2px)" : "translateY(0)",
              }}
            >
              {on && (
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: B.signal,
                    color: "#fff",
                    fontSize: 9,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  ✓
                </div>
              )}
              <span style={{ fontSize: 26 }}>{t.icon}</span>
              <div style={{ fontSize: 13, fontWeight: 600, color: on ? B.signal : B.ink }}>{t.label}</div>
              <div style={{ fontSize: 10, color: B.slate, textAlign: "center" }}>{t.desc}</div>
            </button>
          );
        })}
      </div>
    </OnbStep>,

    <OnbStep key={3} title="מה אתה מביא?" sub="ומה אתה מחפש" step={3} total={4} dir={dir} onBack={() => go(2)} onNext={() => go(4)} ok={true}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: B.green, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 }}>יש לי</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {(Object.entries(ASSETS) as [AssetKey, (typeof ASSETS)[AssetKey]][]).map(([k, { icon, label }]) => {
            const on = data.hasAssets.includes(k);
            return (
              <button
                key={k}
                onClick={() => togAsset(k)}
                style={{
                  ...btn(),
                  padding: "7px 14px",
                  borderRadius: 99,
                  fontSize: 13,
                  background: on ? "rgba(42,157,106,0.15)" : "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(6px)",
                  color: on ? B.green : B.slate,
                  border: `1.5px solid ${on ? B.green : B.glass.border}`,
                }}
              >
                {on ? "✓ " : ""}
                {icon} {label}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: B.signal, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 }}>מחפש</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {SEEKING_LABELS.map((l) => {
            const on = data.seekingTypes.includes(l);
            return (
              <button
                key={l}
                onClick={() => togSeeking(l)}
                style={{
                  ...btn(),
                  padding: "7px 14px",
                  borderRadius: 99,
                  fontSize: 13,
                  background: on ? "rgba(232,64,42,0.12)" : "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(6px)",
                  color: on ? B.signal : B.slate,
                  border: `1.5px solid ${on ? B.signal : B.glass.border}`,
                }}
              >
                {on ? "✓ " : ""}
                {l}
              </button>
            );
          })}
        </div>
      </div>
    </OnbStep>,

    <OnbStep key={4} title="הכל מוכן!" sub="הנה ההתאמות הראשונות שלך" step={4} total={4} dir={dir} onBack={() => go(3)} onNext={() => onDone(data)} ok={true} nextLabel="כנס לדאליו →">
      <div
        style={{
          ...glass({ radius: 18, padding: 18 }),
          marginBottom: 20,
          animation: "fadeUp .4s cubic-bezier(.16,1,.3,1) both",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg,#E8402A,#FF6B4A)",
              boxShadow: "0 6px 18px rgba(232,64,42,.32)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            {chosenType?.icon || "⚡"}
          </div>
          <div>
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 17, fontWeight: 700, color: B.ink }}>{data.name}</div>
            <div style={{ fontSize: 12, color: B.slate }}>{chosenType?.label}</div>
          </div>
        </div>
        {data.hasAssets.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 8 }}>
            {data.hasAssets.map((k) => (
              <span key={k} style={{ background: `${B.green}12`, color: B.green, borderRadius: 99, padding: "2px 8px", fontSize: 11 }}>
                {ASSETS[k]?.icon} {ASSETS[k]?.label}
              </span>
            ))}
          </div>
        )}
        {data.seekingTypes.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {data.seekingTypes.map((l) => (
              <span key={l} style={{ background: `${B.signal}10`, color: B.signal, borderRadius: 99, padding: "2px 8px", fontSize: 11 }}>
                {l}
              </span>
            ))}
          </div>
        )}
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color: B.slate, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 }}>
        ההתאמות הראשונות שלך
      </div>
      {FEED_DATA.slice(0, 2).map((o, i) => (
        <div
          key={o.id}
          style={{
            ...glass({ radius: 12, padding: "12px 14px" }),
            borderLeft: `3px solid ${domainColor(o.domain)}`,
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 8,
            animation: `fadeUp .4s cubic-bezier(.16,1,.3,1) ${0.1 + i * 0.08}s both`,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: `${domainColor(o.domain)}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              flexShrink: 0,
            }}
          >
            {o.emoji}
          </div>
          <div style={{ flex: 1, fontSize: 12, fontWeight: 600, color: B.ink }}>{o.title}</div>
          <MatchChip score={o.score} />
        </div>
      ))}
    </OnbStep>,
  ];

  if (step === 0 || step > steps.length) return null;
  return <div style={{ minHeight: "100vh", overflow: "hidden" }}>{steps[step - 1]}</div>;
}
