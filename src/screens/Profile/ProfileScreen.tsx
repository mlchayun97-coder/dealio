import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { B } from "../../theme/tokens";
import { ASSETS, DOMAINS, SEEKING_LABELS } from "../../data/mock";
import { btn, domainColor, fieldInput, glass } from "../../lib/styleHelpers";
import type { AssetKey, Profile } from "../../types";
import { VerifiedBadge } from "../../components/shared/VerifiedBadge";
import { PCard } from "../../components/shared/PCard";
import { VerificationModal } from "../../modals/VerificationModal";
import { JourneyProgress } from "./JourneyProgress";

const EMPTY_PROFILE: Profile = {
  name: "",
  userType: "",
  city: "",
  bio: "",
  verified: false,
  verifiedMethod: "",
  hasAssets: [],
  seekingTypes: [],
  domains: [],
  goalTitle: "",
  journeyPct: 0,
  journeyDone: [],
  journeyLeft: [],
};

interface ProfileScreenProps {
  profile: Profile | null;
  setProfile: Dispatch<SetStateAction<Profile | null>>;
  onGoal: () => void;
}

export function ProfileScreen({ profile, setProfile, onGoal }: ProfileScreenProps) {
  const [editing, setEditing] = useState(false);
  const [showVerif, setShowVerif] = useState(false);
  const [local, setLocal] = useState<Profile>(profile || EMPTY_PROFILE);

  useEffect(() => {
    if (profile) setLocal(profile);
  }, [profile]);

  const togAsset = (k: AssetKey) =>
    setLocal((p) => ({ ...p, hasAssets: p.hasAssets?.includes(k) ? p.hasAssets.filter((x) => x !== k) : [...(p.hasAssets || []), k] }));
  const togSeeking = (l: string) =>
    setLocal((p) => ({ ...p, seekingTypes: p.seekingTypes?.includes(l) ? p.seekingTypes.filter((x) => x !== l) : [...(p.seekingTypes || []), l] }));
  const togD = (d: string) =>
    setLocal((p) => ({ ...p, domains: p.domains?.includes(d) ? p.domains.filter((x) => x !== d) : [...(p.domains || []), d] }));

  const handleVerify = (data: { method: string; value: string }) => {
    const updated = { ...local, verified: true, verifiedMethod: data.method };
    setLocal(updated);
    setProfile(updated);
  };

  return (
    <div style={{ paddingBottom: 90 }}>
      <div style={{ padding: "16px 16px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 700, color: B.ink }}>הפרופיל שלי</div>
        <button
          onClick={() => {
            if (editing) {
              setProfile({ ...local });
              setEditing(false);
            } else {
              setEditing(true);
            }
          }}
          style={{ ...btn(), padding: "7px 16px", borderRadius: 10, fontSize: 13, fontWeight: 500, background: editing ? "rgba(42,157,106,0.15)" : "rgba(255,255,255,0.55)", backdropFilter: "blur(8px)", border: `1.5px solid ${editing ? B.green : "rgba(255,255,255,0.55)"}`, color: editing ? B.green : B.ink }}
        >
          {editing ? "✓ שמור" : "ערוך"}
        </button>
      </div>
      <div style={{ padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {/* identity */}
        <div style={{ ...glass({ radius: 18, padding: 18 }), display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "linear-gradient(135deg,#E8402A,#FF6B4A)", boxShadow: "0 6px 18px rgba(232,64,42,.32)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontFamily: "'Fraunces',serif", color: B.white, fontWeight: 700, flexShrink: 0 }}>
            d
          </div>
          <div style={{ flex: 1 }}>
            {editing ? (
              <input value={local.name} onChange={(e) => setLocal((p) => ({ ...p, name: e.target.value }))} style={{ ...fieldInput, marginBottom: 6, fontSize: 16, fontWeight: 600 }} />
            ) : (
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 18, fontWeight: 700, color: B.ink, marginBottom: 5 }}>{local.name}</div>
            )}
            <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: B.slate }}>🌍 {local.city || "ישראל"}</span>
              {local.verified && <VerifiedBadge verified={true} verifiedMethod={local.verifiedMethod} />}
            </div>
          </div>
        </div>

        {/* goal engine CTA */}
        <div
          style={{
            background: "linear-gradient(135deg,#E8402A,#FF6B4A)",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 10px 32px rgba(232,64,42,.28), inset 0 1px 0 rgba(255,255,255,0.3)",
            borderRadius: 18,
            padding: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div>
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 3 }}>🎯 Goal Engine</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.8)" }}>הגדר יעד ונמצא לך את הדרך</div>
          </div>
          <button onClick={onGoal} style={{ ...btn(), padding: "8px 16px", background: "rgba(255,255,255,.2)", backdropFilter: "blur(8px)", color: "#fff", borderRadius: 99, fontSize: 12, fontWeight: 600, border: "1px solid rgba(255,255,255,.35)", flexShrink: 0 }}>
            הגדר יעד →
          </button>
        </div>

        {/* journey progress */}
        <JourneyProgress profile={local} />
        {!local.verified ? (
          <div style={{ ...glass({ radius: 18, padding: 16 }), borderTop: `2px solid ${B.green}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 14, fontWeight: 700, color: B.green, marginBottom: 3 }}>אמת את הזהות שלך</div>
              <div style={{ fontSize: 12, color: B.slate }}>קבל 3× יותר פניות</div>
            </div>
            <button onClick={() => setShowVerif(true)} style={{ ...btn(), padding: "8px 16px", background: B.green, color: "#fff", borderRadius: 99, fontSize: 12, fontWeight: 600, flexShrink: 0, boxShadow: "0 4px 14px rgba(42,157,106,.3)" }}>
              אמת →
            </button>
          </div>
        ) : (
          <div style={{ ...glass({ radius: 18, padding: 14 }), borderTop: `2px solid ${B.blue}`, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>✅</span>
            <div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 14, fontWeight: 700, color: B.blue }}>מאומת!</div>
              <div style={{ fontSize: 11, color: B.slate }}>תג אמינות פעיל</div>
            </div>
          </div>
        )}

        {/* has */}
        <PCard title="מה אני מביא" color={B.green}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {(Object.entries(ASSETS) as [AssetKey, (typeof ASSETS)[AssetKey]][]).map(([k, { icon, label }]) => {
              const on = local.hasAssets?.includes(k);
              return (
                <button
                  key={k}
                  onClick={() => editing && togAsset(k)}
                  style={{ ...btn(), padding: "7px 13px", borderRadius: 99, fontSize: 12, background: on ? `${B.green}12` : "transparent", color: on ? B.green : B.slate, border: `1px solid ${on ? B.green : B.mist}`, cursor: editing ? "pointer" : "default" }}
                >
                  {icon} {label}
                </button>
              );
            })}
          </div>
        </PCard>

        {/* seeking */}
        <PCard title="מה אני מחפש" color={B.signal}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {SEEKING_LABELS.map((l) => {
              const on = local.seekingTypes?.includes(l);
              return (
                <button
                  key={l}
                  onClick={() => editing && togSeeking(l)}
                  style={{ ...btn(), padding: "7px 13px", borderRadius: 99, fontSize: 12, background: on ? `${B.signal}10` : "transparent", color: on ? B.signal : B.slate, border: `1px solid ${on ? B.signal : B.mist}`, cursor: editing ? "pointer" : "default" }}
                >
                  {l}
                </button>
              );
            })}
          </div>
        </PCard>

        {/* domains */}
        <PCard title="תחומי עניין" color={B.ink}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {DOMAINS.map((d) => {
              const on = local.domains?.includes(d);
              const dc = domainColor(d);
              return (
                <button
                  key={d}
                  onClick={() => editing && togD(d)}
                  style={{ ...btn(), padding: "7px 13px", borderRadius: 99, fontSize: 12, background: on ? `${dc}12` : "transparent", color: on ? dc : B.slate, border: `1px solid ${on ? dc : B.mist}`, cursor: editing ? "pointer" : "default" }}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </PCard>

        {/* bio */}
        <PCard title="עליי" color={B.blue}>
          {editing ? (
            <textarea
              value={local.bio || ""}
              onChange={(e) => setLocal((p) => ({ ...p, bio: e.target.value }))}
              placeholder="ספר על עצמך..."
              style={{ width: "100%", minHeight: 88, padding: "10px 12px", background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)", border: `1.5px solid ${B.glass.border}`, borderRadius: 12, color: B.ink, fontSize: 14, direction: "rtl", resize: "vertical", outline: "none" }}
            />
          ) : (
            <p style={{ fontSize: 14, color: local.bio ? B.ink : B.slate, lineHeight: 1.75 }}>{local.bio || "הוסף תיאור קצר..."}</p>
          )}
        </PCard>
      </div>
      {showVerif && <VerificationModal onClose={() => setShowVerif(false)} onVerify={handleVerify} />}
    </div>
  );
}
