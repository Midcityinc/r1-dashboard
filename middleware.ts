import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  // Get the current path
  const path = req.nextUrl.pathname

  // Define public routes
  const publicRoutes = ["/login", "/register", "/forgot-password"]
  const isPublicRoute = publicRoutes.includes(path)

  // Check for a simple auth cookie
  const hasAuthCookie = req.cookies.has("r1-auth") || localStorage?.getItem("r1-user")

  // For demo purposes, if user is on a public route and has a token, redirect to dashboard
  if (isPublicRoute && hasAuthCookie) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Allow access to all routes for the demo
  return NextResponse.next()
}

// Only apply middleware to these routes
export const config = {
  matcher: ["/login", "/register", "/forgot-password"],
}
