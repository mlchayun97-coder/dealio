import { B } from "../../theme/tokens";

export function MatchChip({ score }: { score: number }) {
  const color = score >= 80 ? B.signal : score >= 65 ? B.warm : B.slate;
  const bg = score >= 80 ? `${B.signal}12` : score >= 65 ? `${B.warm}20` : `${B.slate}12`;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: bg,
        border: `1px solid ${color}35`,
        color,
        borderRadius: 99,
        padding: "4px 10px",
        fontSize: 12,
        fontWeight: 600,
        fontFamily: "'JetBrains Mono',monospace",
      }}
    >
      {score}% match
    </div>
  );
}
