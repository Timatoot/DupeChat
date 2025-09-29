import { NextRequest } from "next/server";

// Shared rate limit storage and logic
export const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
export const DAILY_LIMIT = 20;
export const RESET_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function getClientIP(request: NextRequest): string {
  // Try to get real IP from headers (for proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, get the first one
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  // Fallback - in development this will be a constant
  // In production with proper proxy setup, one of the headers above should work
  return 'fallback-ip';
}

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = `rate_limit_${ip}`;
  
  let userData = rateLimitStore.get(key);
  
  // If no data exists or it's past reset time, create new entry
  if (!userData || now >= userData.resetTime) {
    const resetTime = now + RESET_INTERVAL;
    userData = { count: 0, resetTime };
    rateLimitStore.set(key, userData);
  }
  
  const remaining = Math.max(0, DAILY_LIMIT - userData.count);
  const allowed = userData.count < DAILY_LIMIT;
  
  return {
    allowed,
    remaining,
    resetTime: userData.resetTime
  };
}

export function incrementRateLimit(ip: string): void {
  const key = `rate_limit_${ip}`;
  const userData = rateLimitStore.get(key);
  
  if (userData) {
    userData.count++;
    rateLimitStore.set(key, userData);
  }
}