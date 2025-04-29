"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  email: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("r1-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Simple sign in function - accepts any credentials
  const signIn = async (email: string, password: string) => {
    // Create a simple user object
    const user = {
      id: "demo-user-id",
      email: email || "demo@example.com",
    }

    // Store in localStorage
    localStorage.setItem("r1-user", JSON.stringify(user))
    setUser(user)

    // Redirect to dashboard
    router.push("/")
  }

  // Simple sign up function - accepts any credentials
  const signUp = async (email: string, password: string) => {
    // Same as signIn for simplicity
    await signIn(email, password)
  }

  // Simple sign out function
  const signOut = async () => {
    localStorage.removeItem("r1-user")
    setUser(null)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
