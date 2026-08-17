import { B } from "../theme/tokens";
import { ACTIVITIES } from "../data/mock";
import { glass } from "../lib/styleHelpers";

export function ActivityPanel() {
  return (
    <div
      style={{
        ...glass({ radius: 16, padding: 16 }),
        marginBottom: 20,
      }}
    >
      <div
        style={{
          fontFamily: "'Fraunces',serif",
          fontSize: 14,
          fontWeight: 700,
          color: B.ink,
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: B.signal, animation: "pulse 2s infinite" }} />
        עכשיו בדאליו
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {ACTIVITIES.map((a, i) => (
          <div
            key={a.id}
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              background: "rgba(255,255,255,0.4)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              animation: `slideIn .3s ease both`,
              animationDelay: `${i * 0.07}s`,
            }}
          >
            <span style={{ fontSize: 14 }}>{a.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: B.ink, lineHeight: 1.4 }}>{a.text}</div>
              <div style={{ fontSize: 10, color: B.slate, marginTop: 1 }}>{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
