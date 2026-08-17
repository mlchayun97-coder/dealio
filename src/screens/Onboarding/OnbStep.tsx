import type { ReactNode } from "react";
import { B } from "../../theme/tokens";
import { btn } from "../../lib/styleHelpers";
import { Logo } from "../../components/shared/Logo";

interface OnbStepProps {
  title: string;
  sub: string;
  step: number;
  total: number;
  dir: "fwd" | "back";
  onBack?: () => void;
  onNext: () => void;
  ok: boolean;
  nextLabel?: string;
  children: ReactNode;
}

export function OnbStep({ title, sub, step, total, dir, onBack, onNext, ok, nextLabel = "המשך →", children }: OnbStepProps) {
  return (
    <div
      key={step}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "32px 24px 40px",
        animation: `${dir === "fwd" ? "stepInFwd" : "stepInBack"} .32s cubic-bezier(.16,1,.3,1) both`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        <Logo size={22} />
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: B.slate }}>
          {step} / {total}
        </span>
      </div>
      <div style={{ display: "flex", gap: 5, marginBottom: 28 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 99,
              background: i < step ? B.signal : B.mist,
              transition: "background .35s cubic-bezier(.16,1,.3,1)",
            }}
          />
        ))}
      </div>
      <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 27, fontWeight: 700, color: B.ink, marginBottom: 5 }}>{title}</h2>
      <p style={{ fontSize: 14, color: B.slate, marginBottom: 26 }}>{sub}</p>
      <div style={{ flex: 1 }}>{children}</div>
      <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{ ...btn(), padding: "13px 18px", background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)", border: `1.5px solid ${B.glass.border}`, borderRadius: 14, color: B.slate, fontSize: 14, fontWeight: 500 }}
          >
            ← חזור
          </button>
        )}
        <button
          onClick={ok ? onNext : undefined}
          style={{
            ...btn(),
            flex: 1,
            padding: "15px",
            background: ok ? "linear-gradient(135deg,#E8402A,#FF6B4A)" : "#E2DCD2",
            borderRadius: 14,
            color: ok ? B.white : "#A69F93",
            fontSize: 15,
            fontWeight: 600,
            fontFamily: "'Fraunces',serif",
            boxShadow: ok ? "0 8px 26px rgba(232,64,42,.32)" : "none",
            cursor: ok ? "pointer" : "not-allowed",
          }}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
