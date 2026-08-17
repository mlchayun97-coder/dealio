const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

export interface AnthropicMessage {
  role: "user" | "assistant";
  content: string;
}

interface CallOptions {
  system?: string;
  maxTokens?: number;
}

/**
 * The only place in this codebase that holds ANTHROPIC_API_KEY. Never expose this
 * function (or the key) to the frontend — it must only run server-side.
 */
export async function callClaude(messages: AnthropicMessage[], { system, maxTokens = 800 }: CallOptions = {}): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set. Copy server/.env.example to server/.env and add your key.");
  }
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";

  const res = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({ model, max_tokens: maxTokens, system, messages }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Anthropic API error ${res.status}: ${body}`);
  }

  const data = (await res.json()) as { content?: { type: string; text?: string }[] };
  const text = data.content?.find((b) => b.type === "text")?.text;
  if (!text) throw new Error("Anthropic API returned no text content");
  return text;
}

/** Strips ```json fences (if the model added them despite instructions) and parses. */
export function parseClaudeJson<T>(text: string): T {
  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned) as T;
}
