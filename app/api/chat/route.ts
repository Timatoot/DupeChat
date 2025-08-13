import { NextRequest } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs"; // Gemini SDK needs Node environment

function j(status: number, message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return j(500, "Server missing GEMINI_API_KEY");

  let body: {
    system: string;
    messages: { role: "user" | "assistant"; content: string }[];
  };
  try {
    body = await req.json();
  } catch {
    return j(400, "Invalid JSON body");
  }

  const { system, messages } = body || {};
  if (!system || !messages?.length) return j(400, "Missing system or messages");

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Find the last user message to generate a response to
    const lastUserIndexFromEnd = [...messages].reverse().findIndex((m) => m.role === "user");
    if (lastUserIndexFromEnd === -1) return j(400, "No user message to respond to");
    const lastIndex = messages.length - 1 - lastUserIndexFromEnd;
    const lastUser = messages[lastIndex];

    // Prior messages become history; map roles to Gemini's expected roles
    const history = messages
      .slice(0, lastIndex)
      .map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] }));

    // Create chat with system instructions and stream reply
    const chat = (ai as any).chats.create({
      model: "gemini-2.5-flash",
      history,
      config: { 
        thinkingConfig: {
          thinkingBudget: 0
        },
        systemInstruction: system,
        temperature: 0.8,
        topP: 0.8,
        topK: 20
      },
    });

    const streamIt = await chat.sendMessageStream({ message: lastUser.content });

    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of streamIt as any) {
            const text = String((chunk as any)?.text ?? "");
            if (text) {
              const payload = { choices: [{ delta: { content: text } }] };
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
            }
          }
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          controller.close();
        } catch (e) {
          controller.error(e);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "content-type": "text/event-stream; charset=utf-8",
        "cache-control": "no-cache, no-transform",
        "x-accel-buffering": "no",
        connection: "keep-alive",
      },
    });
  } catch (err: any) {
    console.error(err);
    return j(500, "Error calling Gemini API");
  }
}
