/**
 * DEBUG ENDPOINT - Environment Variables Check
 * Shows partial key information to verify what's loaded in production
 * ⚠️ DELETE THIS FILE AFTER DEBUGGING
 */

import { NextResponse } from 'next/server';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  // Helper to show partial key (first 20 + last 10 chars)
  const maskKey = (key: string) => {
    if (!key) return 'MISSING';
    if (key.length < 40) return `TOO_SHORT (${key.length} chars)`;
    return `${key.substring(0, 20)}...${key.substring(key.length - 10)} (${key.length} chars)`;
  };

  // Check if keys start with valid JWT format
  const isValidJWT = (key: string) => key.startsWith('eyJ');

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    supabase: {
      url: url || 'MISSING',
      urlCorrect: url === 'https://wchqfddjednbpbyofbmj.supabase.co',
      serviceRoleKey: {
        present: !!serviceKey,
        preview: maskKey(serviceKey),
        validJWT: serviceKey ? isValidJWT(serviceKey) : false,
        length: serviceKey.length,
      },
      anonKey: {
        present: !!anonKey,
        preview: maskKey(anonKey),
        validJWT: anonKey ? isValidJWT(anonKey) : false,
        length: anonKey.length,
      },
    },
    expectedLengths: {
      serviceRoleKey: 236,
      anonKey: 236,
    },
    instructions: [
      '1. Compare serviceRoleKey.preview with your Supabase dashboard',
      '2. Go to https://supabase.com/dashboard/project/wchqfddjednbpbyofbmj/settings/api',
      '3. Check if first 20 chars of service_role key match preview',
      '4. If they do NOT match, copy the correct key from dashboard',
      '5. Update in Vercel → Environment Variables',
    ],
  });
}

export const dynamic = 'force-dynamic';
