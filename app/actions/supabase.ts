"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// Create a server action client
export const createActionClient = () => {
  return createServerComponentClient({ cookies })
}

// Add other server actions here
export const getSession = async () => {
  const supabase = createActionClient()
  const { data } = await supabase.auth.getSession()
  return data.session
}

export const getUser = async () => {
  const supabase = createActionClient()
  const { data } = await supabase.auth.getUser()
  return data.user
}
