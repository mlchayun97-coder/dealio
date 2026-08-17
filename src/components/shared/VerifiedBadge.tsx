import { B } from "../../theme/tokens";

export function VerifiedBadge({
  verified,
  verifiedMethod,
}: {
  verified: boolean;
  verifiedMethod: string;
}) {
  if (!verified) return null;
  const icon =
    verifiedMethod === "linkedin" ? "💼" : verifiedMethod === "business" ? "📋" : verifiedMethod === "portfolio" ? "🎨" : "✓";
  const label = verifiedMethod === "linkedin" ? "LinkedIn" : verifiedMethod === "business" ? "עסק מאומת" : "מאומת";
  return (
    <span
      style={{
        background: `${B.blue}15`,
        color: B.blue,
        border: `1px solid ${B.blue}30`,
        borderRadius: 99,
        padding: "2px 8px",
        fontSize: 10,
        fontWeight: 600,
      }}
    >
      {icon} {label}
    </span>
  );
}
