import { B } from "../theme/tokens";
import { NAV } from "../data/mock";
import { btn, glass } from "../lib/styleHelpers";

export function BottomNav({ tab, setTab }: { tab: string; setTab: (id: string) => void }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "max(14px, env(safe-area-inset-bottom,0px))",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 24px)",
        maxWidth: 516,
        zIndex: 50,
      }}
    >
      <nav
        style={{
          ...glass({ strong: true, radius: 22, hover: true }),
          display: "flex",
          padding: "6px 6px",
        }}
      >
        {NAV.map((n) => {
          const a = tab === n.id;
          return (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              style={{
                ...btn(),
                flex: 1,
                padding: "9px 0 8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                borderRadius: 16,
                background: a ? "rgba(232,64,42,0.12)" : "transparent",
              }}
            >
              <span
                style={{
                  fontSize: n.id === "goal" ? 22 : 21,
                  lineHeight: 1,
                  filter: a ? "none" : "grayscale(100%) opacity(45%)",
                  transform: a ? "scale(1.1)" : "scale(1)",
                  transition: "all .2s",
                }}
              >
                {n.icon}
              </span>
              <span style={{ fontSize: 10, fontWeight: a ? 600 : 400, color: a ? B.signal : B.slate }}>{n.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
