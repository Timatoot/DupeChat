import { NextRequest } from "next/server";
export const runtime = "edge"; // or "nodejs" if you prefer

function j(status: number, message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return j(500, "Server missing OPENROUTER_API_KEY");

  let body: {
    system: string;
    messages: { role: "user" | "assistant"; content: string }[];
    model?: string;
    temperature?: number;
    max_tokens?: number;
  };
  try {
    body = await req.json();
  } catch {
    return j(400, "Invalid JSON body");
  }

  const {
    system,
    messages,
    model = "@preset/dopple-prototype",
  } = body || {};

  if (!system || !messages?.length) return j(400, "Missing system or messages");

  const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      stream: true,
      messages: [{ role: "system", content: system }, ...messages],
    }),
  }).catch(() => null);

  if (!r) return j(504, "Upstream timeout");
  if (r?.status === 401) return j(401, "Invalid API key");
  if (r?.status === 429) return j(429, "Rate limited");
  if (!r?.ok) return j(502, await r.text().catch(() => r.statusText));

  return new Response(r.body, {
    headers: {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      "x-accel-buffering": "no",
      connection: "keep-alive",
    },
  });
}
