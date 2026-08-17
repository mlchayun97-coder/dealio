import type { Blueprint, ChatMessage, GoalAnswers, Opportunity, OpportunityAnalysis } from "../types";

// In dev, Vite proxies /api/* to the local backend (see vite.config.ts + server/).
// In prod, point VITE_API_BASE_URL at the deployed backend if it's not same-origin.
const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`${path} failed: ${res.status} ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

export function analyzeOpportunity(o: Opportunity): Promise<OpportunityAnalysis> {
  return post<OpportunityAnalysis>("/analyze", { opportunity: o });
}

export function chatReply(
  opp: Opportunity,
  history: ChatMessage[],
  newText: string,
): Promise<string> {
  return post<{ text: string }>("/chat", {
    author: opp.author,
    title: opp.title,
    messages: history.map((m) => ({ from: m.from, text: m.text })),
    newMessage: newText,
  }).then((r) => r.text);
}

export function buildBlueprint(goalLabel: string, answers: GoalAnswers): Promise<Blueprint> {
  return post<Blueprint>("/blueprint", { goalLabel, answers });
}
