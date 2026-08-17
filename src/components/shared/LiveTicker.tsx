import { B } from "../../theme/tokens";
import { TICKER_TEXT } from "../../data/mock";

export function LiveTicker() {
  const t = TICKER_TEXT.join("   ·   ") + "   ·   " + TICKER_TEXT.join("   ·   ");
  return (
    <div
      style={{
        background: B.ink,
        padding: "7px 0",
        overflow: "hidden",
        fontSize: 12,
        fontWeight: 500,
        color: B.warm,
        letterSpacing: 0.3,
      }}
    >
      <div
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          animation: "ticker 30s linear infinite",
          paddingRight: 40,
        }}
      >
        {t}
      </div>
    </div>
  );
}
