import { B } from "../../theme/tokens";
import { glass } from "../../lib/styleHelpers";
import type { Profile } from "../../types";

export function JourneyProgress({ profile }: { profile: Profile }) {
  if (!profile?.goalTitle) return null;
  const pct = profile.journeyPct || 35;
  const done = profile.journeyDone?.length ? profile.journeyDone : ["ספק נמצא"];
  const left = profile.journeyLeft?.length ? profile.journeyLeft : ["משקיע", "זכיין נוסף"];

  return (
    <div style={glass({ radius: 18, padding: 18 })}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: B.signal, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Dealio Journey</div>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: 15, fontWeight: 700, color: B.ink }}>🎯 {profile.goalTitle}</div>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 18, fontWeight: 500, color: B.signal }}>{pct}%</div>
      </div>

      <div style={{ height: 8, background: "rgba(13,13,13,.08)", borderRadius: 99, marginBottom: 16, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#E8402A,#FF6B4A)", borderRadius: 99, transition: "width .6s ease" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: B.green, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>הושלם ✓</div>
          {done.map((d) => (
            <div key={d} style={{ fontSize: 12, color: B.ink, marginBottom: 5, display: "flex", gap: 5 }}>
              <span style={{ color: B.green }}>✓</span>
              {d}
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: B.signal, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>חסר</div>
          {left.map((l) => (
            <div key={l} style={{ fontSize: 12, color: B.ink, marginBottom: 5, display: "flex", gap: 5 }}>
              <span style={{ color: B.signal }}>◎</span>
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
