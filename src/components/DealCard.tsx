import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { B } from "../theme/tokens";
import { ASSETS } from "../data/mock";
import { btn, domainColor, glass } from "../lib/styleHelpers";
import type { Opportunity } from "../types";
import { MatchChip } from "./shared/MatchChip";
import { VerifiedBadge } from "./shared/VerifiedBadge";

interface DealCardProps {
  o: Opportunity;
  i?: number;
  onView?: (o: Opportunity) => void;
  setFeed?: Dispatch<SetStateAction<Opportunity[]>>;
  compact?: boolean;
}

export function DealCard({ o, i = 0, onView, setFeed, compact = false }: DealCardProps) {
  const [hov, setHov] = useState(false);
  const dc = domainColor(o.domain);
  const toggle = (field: "saved" | "liked") =>
    setFeed && setFeed((p) => p.map((x) => (x.id === o.id ? { ...x, [field]: !x[field] } : x)));

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...glass({ radius: 16, hover: hov }),
        borderLeft: `4px solid ${dc}`,
        transform: hov ? "translateY(-3px) scale(1.005)" : "translateY(0) scale(1)",
        animation: `fadeUp .5s cubic-bezier(.16,1,.3,1) both`,
        animationDelay: `${i * 0.06}s`,
        overflow: "hidden",
      }}
    >
      <div style={{ padding: compact ? "14px 16px" : "18px 20px" }}>
        {/* header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: `${dc}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              {o.emoji}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: B.ink }}>{o.author}</span>
                <VerifiedBadge verified={o.verified} verifiedMethod={o.verifiedMethod} />
              </div>
              <div style={{ fontSize: 11, color: B.slate, marginTop: 1 }}>
                {o.handle} · {o.time}
              </div>
            </div>
          </div>
          <MatchChip score={o.score} />
        </div>

        {/* title */}
        <h3
          style={{
            fontFamily: "'Fraunces',serif",
            fontSize: compact ? 14 : 16,
            fontWeight: 700,
            lineHeight: 1.35,
            color: B.ink,
            marginBottom: compact ? 8 : 10,
          }}
        >
          {o.title}
        </h3>

        {!compact && <p style={{ fontSize: 13, color: B.slate, lineHeight: 1.7, marginBottom: 12 }}>{o.desc}</p>}

        {/* meta row */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
          <span style={{ fontSize: 11, color: B.slate, display: "flex", alignItems: "center", gap: 3 }}>📍 {o.city}</span>
          <span style={{ fontSize: 11, color: B.slate, display: "flex", alignItems: "center", gap: 3 }}>💡 {o.model}</span>
          <span
            style={{
              background: `${dc}12`,
              color: dc,
              border: `1px solid ${dc}25`,
              borderRadius: 99,
              padding: "1px 8px",
              fontSize: 10,
              fontWeight: 600,
            }}
          >
            {o.domain}
          </span>
        </div>

        {/* pulse */}
        {(o.viewing > 0 || o.interested > 0 || o.chatting) && (
          <div
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 12,
              paddingBottom: 12,
              borderBottom: "1px solid rgba(13,13,13,.08)",
            }}
          >
            {o.viewing > 0 && <span style={{ fontSize: 11, color: B.blue, fontWeight: 500 }}>👀 {o.viewing} צופים</span>}
            {o.interested > 0 && (
              <span style={{ fontSize: 11, color: B.green, fontWeight: 500 }}>🤝 {o.interested} מעוניינים</span>
            )}
            {o.chatting && (
              <span style={{ fontSize: 11, color: B.signal, fontWeight: 500, animation: "pulse 1.5s infinite" }}>
                💬 שיחה פעילה
              </span>
            )}
          </div>
        )}

        {/* assets */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: compact ? 0 : 16 }}>
          {o.has?.map((k) => (
            <span
              key={k}
              style={{
                background: `${B.green}12`,
                color: B.green,
                border: `1px solid ${B.green}25`,
                borderRadius: 99,
                padding: "3px 9px",
                fontSize: 11,
                fontWeight: 500,
              }}
            >
              {ASSETS[k]?.icon} {ASSETS[k]?.label}
            </span>
          ))}
          {o.needs?.map((k) => (
            <span
              key={k}
              style={{
                background: `${B.signal}10`,
                color: B.signal,
                border: `1px solid ${B.signal}25`,
                borderRadius: 99,
                padding: "3px 9px",
                fontSize: 11,
                fontWeight: 500,
              }}
            >
              + {ASSETS[k]?.label}
            </span>
          ))}
        </div>

        {/* actions */}
        {!compact && setFeed && (
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => onView && onView(o)}
              style={{
                ...btn(),
                flex: 1,
                padding: "10px 0",
                background: "linear-gradient(135deg,#E8402A,#FF6B4A)",
                borderRadius: 12,
                color: B.white,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "'Inter',sans-serif",
                boxShadow: "0 6px 18px rgba(232,64,42,.32)",
              }}
            >
              בדוק התאמה
            </button>
            <button
              onClick={() => toggle("saved")}
              style={{
                ...btn(),
                width: 42,
                height: 42,
                borderRadius: 12,
                background: o.saved ? "rgba(242,201,76,0.25)" : "rgba(255,255,255,0.5)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: `1px solid ${o.saved ? B.warm : "rgba(255,255,255,0.5)"}`,
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {o.saved ? "💛" : "🤍"}
            </button>
            <button
              onClick={() => toggle("liked")}
              style={{
                ...btn(),
                width: 42,
                height: 42,
                borderRadius: 12,
                background: o.liked ? "rgba(42,157,106,0.2)" : "rgba(255,255,255,0.5)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: `1px solid ${o.liked ? B.green : "rgba(255,255,255,0.5)"}`,
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {o.liked ? "✅" : "💬"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
