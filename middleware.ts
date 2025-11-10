import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the hostname from the request
  const hostname = request.headers.get('host') || ''
  
  // If accessing with www subdomain on Railway, redirect to non-www
  if (hostname.startsWith('www.') && hostname.includes('.up.railway.app')) {
    const newUrl = request.url.replace(hostname, hostname.replace('www.', ''))
    return NextResponse.redirect(newUrl, 301)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}