import type { ReactNode } from "react";
import { B } from "../../theme/tokens";
import { glass } from "../../lib/styleHelpers";

export function PCard({ title, color, children }: { title: string; color: string; children: ReactNode }) {
  return (
    <div
      style={{
        ...glass({ radius: 16, padding: 16 }),
        borderTop: `3px solid ${color}`,
      }}
    >
      <div style={{ fontFamily: "'Fraunces',serif", fontSize: 14, fontWeight: 700, color: B.ink, marginBottom: 12 }}>
        {title}
      </div>
      {children}
    </div>
  );
}
