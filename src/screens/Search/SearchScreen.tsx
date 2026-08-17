import { useState } from "react";
import type { ReactNode } from "react";
import { B } from "../../theme/tokens";
import { ASSETS, DOMAINS } from "../../data/mock";
import { btn, domainColor, glass } from "../../lib/styleHelpers";
import type { AssetKey, Opportunity } from "../../types";
import { MatchChip } from "../../components/shared/MatchChip";
import { VerifiedBadge } from "../../components/shared/VerifiedBadge";

export function SearchScreen({ feed, onView }: { feed: Opportunity[]; onView: (o: Opportunity) => void }) {
  const [q, setQ] = useState("");
  const [dom, setDom] = useState<string | null>(null);
  const [need, setNeed] = useState<AssetKey | null>(null);
  const [focused, setFocused] = useState(false);

  const qL = q.trim().toLowerCase();
  const list = feed.filter((o) => {
    const mQ =
      !qL ||
      o.title?.toLowerCase().includes(qL) ||
      o.city?.toLowerCase().includes(qL) ||
      o.domain?.toLowerCase().includes(qL) ||
      o.author?.toLowerCase().includes(qL) ||
      o.desc?.toLowerCase().includes(qL);
    return mQ && (!dom || o.domain === dom) && (!need || o.needs?.includes(need));
  });

  const hl = (text: string): ReactNode => {
    if (!qL || !text) return text;
    const idx = text.toLowerCase().indexOf(qL);
    if (idx === -1) return text;
    return (
      <span>
        {text.slice(0, idx)}
        <mark style={{ background: `${B.signal}25`, color: B.signal, borderRadius: 3, padding: "0 2px" }}>
          {text.slice(idx, idx + qL.length)}
        </mark>
        {text.slice(idx + qL.length)}
      </span>
    );
  };

  return (
    <div style={{ paddingBottom: 90 }}>
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
        <div style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 700, color: B.ink, marginBottom: 12 }}>חיפוש</div>
        <div style={{ position: "relative", marginBottom: 10 }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="🔍  כותרת, עיר, תחום, שם..."
            style={{
              width: "100%",
              padding: "11px 14px",
              background: focused ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: `1.5px solid ${focused ? B.signal : "rgba(255,255,255,0.55)"}`,
              boxShadow: focused ? `0 0 0 4px ${B.signal}18` : "none",
              borderRadius: 12,
              color: B.ink,
              fontSize: 14,
              outline: "none",
              direction: "rtl",
              transition: "border-color .15s, box-shadow .15s, background .15s",
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {q && (
            <button
              onClick={() => setQ("")}
              style={{ ...btn(), position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "none", color: B.slate, fontSize: 13, lineHeight: 1 }}
            >
              ✕
            </button>
          )}
        </div>
        <div style={{ display: "flex", gap: 5, overflowX: "auto", paddingBottom: 5, marginBottom: 5 }}>
          {DOMAINS.map((d) => {
            const a = dom === d;
            return (
              <button
                key={d}
                onClick={() => setDom(a ? null : d)}
                style={{ ...btn(), padding: "4px 12px", borderRadius: 99, fontSize: 11, background: a ? B.ink : "transparent", color: a ? B.white : B.slate, border: `1px solid ${a ? B.ink : B.mist}`, whiteSpace: "nowrap" }}
              >
                {d}
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 5, overflowX: "auto", paddingBottom: 2 }}>
          <span style={{ fontSize: 10, color: B.slate, alignSelf: "center", flexShrink: 0, paddingLeft: 4 }}>צריכים:</span>
          {(Object.entries(ASSETS) as [AssetKey, (typeof ASSETS)[AssetKey]][]).map(([k, { icon, label }]) => {
            const a = need === k;
            return (
              <button
                key={k}
                onClick={() => setNeed(a ? null : k)}
                style={{ ...btn(), padding: "4px 10px", borderRadius: 99, fontSize: 11, background: a ? `${B.signal}12` : "transparent", color: a ? B.signal : B.slate, border: `1px solid ${a ? B.signal : B.mist}`, whiteSpace: "nowrap" }}
              >
                {icon} {label}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: "10px 16px 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: B.slate }}>{list.length} תוצאות</span>
        {(q || dom || need) && (
          <button
            onClick={() => {
              setQ("");
              setDom(null);
              setNeed(null);
            }}
            style={{ ...btn(), fontSize: 11, color: B.signal, background: "none" }}
          >
            נקה ✕
          </button>
        )}
      </div>

      {list.length === 0 && (
        <div style={{ padding: "60px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: 18, fontWeight: 700, color: B.ink, marginBottom: 6 }}>לא נמצאו תוצאות</div>
          <div style={{ fontSize: 14, color: B.slate }}>נסה מילות חיפוש שונות</div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "4px 16px 0" }}>
        {list.map((o, i) => (
          <div
            key={o.id}
            onClick={() => onView(o)}
            style={{
              ...glass({ radius: 14, padding: "12px 14px" }),
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
              animation: "fadeUp .35s cubic-bezier(.16,1,.3,1) both",
              animationDelay: `${Math.min(i, 8) * 0.04}s`,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = B.glass.bgStrong)}
            onMouseLeave={(e) => (e.currentTarget.style.background = B.glass.bg)}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: `${domainColor(o.domain)}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
                borderLeft: `3px solid ${domainColor(o.domain)}`,
              }}
            >
              {o.emoji}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 14, fontWeight: 700, color: B.ink, lineHeight: 1.3, marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {hl(o.title)}
              </div>
              <div style={{ fontSize: 11, color: B.slate, marginBottom: 4 }}>
                📍 {hl(o.city)} · {hl(o.domain)}
              </div>
              <div style={{ display: "flex", gap: 5 }}>
                <VerifiedBadge verified={o.verified} verifiedMethod={o.verifiedMethod} />
                {o.needs?.slice(0, 2).map((k) => (
                  <span key={k} style={{ background: `${B.signal}10`, color: B.signal, borderRadius: 99, padding: "1px 7px", fontSize: 10 }}>
                    + {ASSETS[k]?.label}
                  </span>
                ))}
              </div>
            </div>
            <MatchChip score={o.score} />
          </div>
        ))}
      </div>
    </div>
  );
}
