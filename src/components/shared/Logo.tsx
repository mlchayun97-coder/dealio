import { B } from "../../theme/tokens";

export function Logo({ size = 24 }: { size?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
      <div
        style={{
          width: size,
          height: size,
          background: B.signal,
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Fraunces',serif",
          fontSize: size * 0.6,
          color: B.white,
          fontWeight: 700,
          letterSpacing: -1,
          flexShrink: 0,
        }}
      >
        d
      </div>
      <span
        style={{
          fontFamily: "'Fraunces',serif",
          fontSize: size * 0.85,
          fontWeight: 700,
          color: B.ink,
          letterSpacing: -0.5,
        }}
      >
        dealio
      </span>
    </div>
  );
}
