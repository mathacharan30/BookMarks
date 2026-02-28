import { NextResponse } from 'next/server'

// Firebase handles auth client-side via popup, so this route is no longer needed.
// Keeping it as a redirect fallback.
export async function GET(request) {
  const { origin } = new URL(request.url)
  return NextResponse.redirect(`${origin}/dashboard`)
}
