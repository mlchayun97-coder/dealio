import { useEffect, useRef, useState } from "react";
import { B } from "../../theme/tokens";
import { INIT_MSGS } from "../../data/mock";
import { btn, domainColor } from "../../lib/styleHelpers";
import { chatReply } from "../../lib/api";
import type { ChatMessage, Opportunity } from "../../types";
import { MatchChip } from "../../components/shared/MatchChip";

const STAGES = ["👋 קשר", "🤝 היכרות", "💡 הצעה", "✍️ חתימה"];

export function DealRoom({ opp, onBack }: { opp: Opportunity | null; onBack: () => void }) {
  const [msgs, setMsgs] = useState<ChatMessage[]>(INIT_MSGS);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const send = async () => {
    if (!input.trim() || !opp) return;
    const t = new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" });
    const me: ChatMessage = { id: Date.now(), from: "me", text: input, t };
    setMsgs((p) => [...p, me]);
    const txt = input;
    setInput("");
    setTyping(true);
    try {
      const reply = await chatReply(opp, msgs, txt);
      setMsgs((p) => [...p, { id: Date.now() + 1, from: "them", text: reply, t: new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }) }]);
    } catch {
      setMsgs((p) => [...p, { id: Date.now() + 1, from: "them", text: "מצטערים, נסה שוב", t: "" }]);
    }
    setTyping(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* header */}
      <div
        style={{
          padding: "12px 16px",
          background: "rgba(255,255,255,0.68)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          borderBottom: "1px solid rgba(255,255,255,0.5)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          boxShadow: "0 4px 20px rgba(31,25,60,.05)",
        }}
      >
        <button onClick={onBack} style={{ ...btn(), width: 34, height: 34, borderRadius: 12, background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)", border: `1px solid ${B.glass.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: B.slate }}>
          ←
        </button>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${domainColor(opp?.domain || "")}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
          {opp?.emoji}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: 14, fontWeight: 700, color: B.ink }}>Deal Room</div>
          <div style={{ fontSize: 11, color: B.green, display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: B.green, animation: "pulse 2s infinite" }} />
            {opp?.author} · פעיל
          </div>
        </div>
        <MatchChip score={opp?.score || 80} />
      </div>

      {/* stages */}
      <div style={{ padding: "8px 16px", background: "rgba(255,255,255,0.5)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.5)", display: "flex", gap: 6, overflowX: "auto" }}>
        {STAGES.map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", fontSize: 8, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", background: i === 0 ? B.signal : B.mist, color: i === 0 ? "#fff" : B.slate }}>
              {i === 0 ? "✓" : i + 1}
            </div>
            <span style={{ fontSize: 11, color: i === 0 ? B.signal : B.slate, fontWeight: i === 0 ? 600 : 400 }}>{s}</span>
            {i < STAGES.length - 1 && <div style={{ width: 10, height: 1, background: B.mist, marginLeft: 2 }} />}
          </div>
        ))}
      </div>

      {/* messages */}
      <div style={{ flex: 1, overflow: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
        {msgs.map((m) => (
          <div key={m.id} style={{ display: "flex", justifyContent: m.from === "me" ? "flex-start" : "flex-end", animation: "slideIn .2s ease" }}>
            <div
              style={{
                maxWidth: "76%",
                padding: "10px 14px",
                fontSize: 14,
                lineHeight: 1.6,
                background: m.from === "me" ? "linear-gradient(135deg,#E8402A,#FF6B4A)" : "rgba(255,255,255,0.65)",
                backdropFilter: m.from === "them" ? "blur(10px)" : undefined,
                WebkitBackdropFilter: m.from === "them" ? "blur(10px)" : undefined,
                color: m.from === "me" ? B.white : B.ink,
                borderRadius: m.from === "me" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                boxShadow: m.from === "me" ? "0 6px 18px rgba(232,64,42,.28)" : "0 1px 6px rgba(0,0,0,.06)",
                border: m.from === "them" ? `1px solid ${B.glass.border}` : "none",
              }}
            >
              {m.text}
              {m.t && <div style={{ fontSize: 10, color: m.from === "me" ? "rgba(255,255,255,.5)" : B.slate, marginTop: 4, textAlign: "left" }}>{m.t}</div>}
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(10px)", borderRadius: "16px 16px 16px 4px", padding: "12px 16px", border: `1px solid ${B.glass.border}`, boxShadow: "0 1px 6px rgba(0,0,0,.06)" }}>
              <div style={{ display: "flex", gap: 4 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: B.mist, animation: `dot 1.3s ease infinite`, animationDelay: `${i * 0.18}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* input */}
      <div style={{ padding: "10px 12px", background: "rgba(255,255,255,0.68)", backdropFilter: "blur(16px) saturate(180%)", WebkitBackdropFilter: "blur(16px) saturate(180%)", borderTop: "1px solid rgba(255,255,255,0.5)", display: "flex", gap: 8, alignItems: "center" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="כתוב הודעה..."
          style={{ flex: 1, padding: "10px 14px", background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", border: `1.5px solid ${B.glass.border}`, borderRadius: 99, fontSize: 14, color: B.ink, outline: "none", direction: "rtl", transition: "border-color .15s, background .15s" }}
          onFocus={(e) => {
            e.target.style.borderColor = B.signal;
            e.target.style.background = "rgba(255,255,255,0.85)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = B.glass.border;
            e.target.style.background = "rgba(255,255,255,0.6)";
          }}
        />
        <button
          onClick={send}
          style={{
            ...btn(),
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: input.trim() ? "linear-gradient(135deg,#E8402A,#FF6B4A)" : "rgba(13,13,13,.08)",
            boxShadow: input.trim() ? "0 4px 14px rgba(232,64,42,.35)" : "none",
            color: input.trim() ? B.white : B.slate,
            fontSize: 17,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all .2s",
          }}
        >
          ⚡
        </button>
      </div>
    </div>
  );
}
