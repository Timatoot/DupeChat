import { NextRequest } from "next/server";
import { getClientIP, checkRateLimit, DAILY_LIMIT } from "@/lib/rate-limit";

export async function GET(req: NextRequest) {
  const clientIP = getClientIP(req);
  const status = checkRateLimit(clientIP);
  
  return new Response(
    JSON.stringify({
      allowed: status.allowed,
      remaining: status.remaining,
      used: DAILY_LIMIT - status.remaining,
      limit: DAILY_LIMIT,
      resetTime: status.resetTime,
      resetDate: new Date(status.resetTime).toLocaleString()
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
        "X-RateLimit-Limit": DAILY_LIMIT.toString(),
        "X-RateLimit-Remaining": status.remaining.toString(),
        "X-RateLimit-Reset": status.resetTime.toString()
      },
    }
  );
}