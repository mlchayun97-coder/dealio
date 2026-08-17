import { B } from "../../theme/tokens";

const FACES = ["🧑🏻‍💼", "👩🏽‍💼", "🧔🏻", "👩🏻‍💻", "🧑🏾‍💼"];

export function AvatarStack() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ display: "flex" }}>
        {FACES.map((f, i) => (
          <div
            key={i}
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(6px)",
              border: "2px solid rgba(255,255,255,0.7)",
              outline: `1px solid ${B.glass.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              marginRight: i === 0 ? 0 : -10,
              boxShadow: "0 1px 3px rgba(13,13,13,.08)",
              position: "relative",
              zIndex: FACES.length - i,
            }}
          >
            {f}
          </div>
        ))}
      </div>
      <span style={{ fontSize: 12.5, color: B.slate, fontWeight: 500 }}>
        <strong style={{ color: B.ink, fontWeight: 700 }}>2,400+</strong> כבר כאן
      </span>
    </div>
  );
}
