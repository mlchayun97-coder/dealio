import { Router } from "express";
import { callClaude, parseClaudeJson } from "../anthropic.js";

export const aiRouter = Router();

// Kept in sync by hand with src/data/mock.ts ASSETS — small enough that duplicating
// just the labels here is simpler than sharing a package between frontend/backend.
const ASSET_LABELS: Record<string, string> = {
  money: "כסף",
  knowledge: "ידע",
  audience: "קהל",
  business: "עסק",
  connections: "קשרים",
  operations: "תפעול",
  idea: "רעיון",
};
const labelsFor = (keys: string[] = []) => keys.map((k) => ASSET_LABELS[k] || k).join(", ");

interface OpportunityInput {
  title: string;
  domain: string;
  model: string;
  has?: string[];
  needs?: string[];
}

interface OpportunityAnalysis {
  summary: string;
  pros: string[];
  risks: string[];
  opener: string;
}

aiRouter.post("/analyze", async (req, res) => {
  const o = req.body?.opportunity as OpportunityInput | undefined;
  if (!o?.title || !o?.domain) {
    return res.status(400).json({ error: "opportunity.title and opportunity.domain are required" });
  }
  try {
    const prompt = `נתח הזדמנות עסקית בעברית. כותרת: ${o.title} | תחום: ${o.domain} | יש להם: ${labelsFor(o.has)} | חסר: ${labelsFor(o.needs)} | מודל: ${o.model}. JSON בלבד ללא backticks: {"summary":"2 משפטים","pros":["כוח1","כוח2","כוח3"],"risks":["סיכון1","סיכון2"],"opener":"פתיחת שיחה מוצעת"}`;
    const text = await callClaude([{ role: "user", content: prompt }], { maxTokens: 800 });
    const analysis = parseClaudeJson<OpportunityAnalysis>(text);
    res.json(analysis);
  } catch (err) {
    console.error("[/api/analyze]", err);
    res.status(502).json({ summary: "לא זמין כרגע", pros: [], risks: [], opener: "" });
  }
});

interface ChatInput {
  author: string;
  title: string;
  messages: { from: "me" | "them"; text: string }[];
  newMessage: string;
}

aiRouter.post("/chat", async (req, res) => {
  const { author, title, messages, newMessage } = (req.body || {}) as Partial<ChatInput>;
  if (!author || !title || !newMessage) {
    return res.status(400).json({ error: "author, title, and newMessage are required" });
  }
  try {
    const system = `אתה ${author}, בעל ההצעה "${title}". ענה בעברית קצרה ועניינית, 2-3 משפטים.`;
    const history = (messages || []).map((m) => ({ role: (m.from === "me" ? "user" : "assistant") as "user" | "assistant", content: m.text }));
    const text = await callClaude([...history, { role: "user", content: newMessage }], { system, maxTokens: 800 });
    res.json({ text });
  } catch (err) {
    console.error("[/api/chat]", err);
    res.status(502).json({ text: "מצטערים, נסה שוב" });
  }
});

interface BlueprintAnswers {
  budget: string;
  stage: string;
  missing: string;
  timeline: string;
  area: string;
}

interface Blueprint {
  title: string;
  summary: string;
  needs: { icon: string; label: string; desc: string }[];
  timeline: string;
  first_step: string;
}

aiRouter.post("/blueprint", async (req, res) => {
  const { goalLabel, answers } = (req.body || {}) as { goalLabel?: string; answers?: BlueprintAnswers };
  if (!goalLabel || !answers) {
    return res.status(400).json({ error: "goalLabel and answers are required" });
  }
  try {
    const prompt = `אתה יועץ עסקי ב-Dealio. המשתמש רוצה: "${goalLabel}". פרטים: תקציב: ${answers.budget}, שלב: ${answers.stage}, חסר: ${answers.missing}, ציר זמן: ${answers.timeline}, אזור: ${answers.area}.

צור Growth Blueprint בעברית. JSON בלבד ללא backticks:
{"title":"כותרת קצרה","summary":"משפט אחד","needs":[{"icon":"💰","label":"משקיע","desc":"מה בדיוק"},{"icon":"🤝","label":"שותף תפעול","desc":"מה בדיוק"},{"icon":"📋","label":"עו\\"ד","desc":"מה בדיוק"},{"icon":"⚙️","label":"מנהל","desc":"מה בדיוק"}],"timeline":"ציר זמן","first_step":"הצעד הראשון שהוא צריך לעשות עכשיו"}`;
    const text = await callClaude([{ role: "user", content: prompt }], { maxTokens: 1000 });
    const blueprint = parseClaudeJson<Blueprint>(text);
    res.json(blueprint);
  } catch (err) {
    console.error("[/api/blueprint]", err);
    res.status(502).json({ title: "Blueprint", summary: "לא ניתן לטעון", needs: [], timeline: "", first_step: "" });
  }
});
