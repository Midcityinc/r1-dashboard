"use client"

import { useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { usePathname, useRouter } from "next/navigation"

export function AutoLogin() {
  const { user, loading, signIn } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // If not logged in and not on a login page, auto-login
    if (!loading && !user && !pathname.includes("/login") && !pathname.includes("/register")) {
      // Auto-login with demo credentials
      signIn("demo@example.com", "password")
    }
  }, [user, loading, pathname, signIn])

  return null
}
