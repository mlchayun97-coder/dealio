import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { B } from "../../theme/tokens";
import { DOMAINS } from "../../data/mock";
import { btn, fieldInput, focusSignal, blurMist } from "../../lib/styleHelpers";
import type { Opportunity } from "../../types";
import { Logo } from "../../components/shared/Logo";
import { LiveTicker } from "../../components/shared/LiveTicker";
import { ActivityPanel } from "../../components/ActivityPanel";
import { DealCard } from "../../components/DealCard";

interface HomeScreenProps {
  feed: Opportunity[];
  setFeed: Dispatch<SetStateAction<Opportunity[]>>;
  onView: (o: Opportunity) => void;
  onAdd: () => void;
  userName?: string;
  onShowSuccess: () => void;
}

export function HomeScreen({ feed, setFeed, onView, onAdd, userName, onShowSuccess }: HomeScreenProps) {
  const [dom, setDom] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const list = feed.filter((o) => (!q || o.title.includes(q)) && (!dom || o.domain === dom));

  return (
    <div style={{ paddingBottom: 90 }}>
      {/* sticky topbar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "rgba(247,244,239,0.55)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          padding: "14px 16px 10px",
          borderBottom: "1px solid rgba(255,255,255,0.5)",
          boxShadow: "0 4px 24px rgba(31,25,60,.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div>
            <Logo size={22} />
            <div style={{ fontSize: 11, color: B.slate, marginTop: 3 }}>שלום, {userName || "שם"} 👋</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              onClick={onShowSuccess}
              style={{ ...btn(), padding: "7px 12px", background: "rgba(242,201,76,0.25)", backdropFilter: "blur(6px)", border: "1px solid rgba(242,201,76,0.5)", borderRadius: 10, color: "#8B6914", fontSize: 12, fontWeight: 600 }}
            >
              🌟 הצלחות
            </button>
            <button onClick={onAdd} style={{ ...btn(), padding: "8px 16px", background: "linear-gradient(135deg,#E8402A,#FF6B4A)", borderRadius: 10, color: B.white, fontSize: 13, fontWeight: 600, boxShadow: "0 4px 14px rgba(232,64,42,.32)" }}>
              + פרסם
            </button>
          </div>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="חפש הזדמנות, תחום, עיר..."
          style={{ ...fieldInput, marginBottom: 10 }}
          onFocus={focusSignal}
          onBlur={blurMist}
        />
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 2 }}>
          {["הכל", ...DOMAINS].map((d) => {
            const a = d === "הכל" ? !dom : dom === d;
            return (
              <button
                key={d}
                onClick={() => setDom(d === "הכל" ? null : d)}
                style={{ ...btn(), padding: "5px 13px", borderRadius: 99, fontSize: 12, fontWeight: 500, background: a ? B.ink : "transparent", color: a ? B.white : B.slate, border: `1px solid ${a ? B.ink : B.mist}`, whiteSpace: "nowrap" }}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      <LiveTicker />

      <div style={{ padding: "16px 16px 0" }}>
        <ActivityPanel />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {list.map((o, i) => (
            <DealCard key={o.id} o={o} i={i} onView={onView} setFeed={setFeed} />
          ))}
        </div>
      </div>
    </div>
  );
}
