import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { agentId } = await request.json()

    // In a real app, this would update the active agent in the database

    return NextResponse.json({
      success: true,
      message: `Agent ${agentId} activated successfully`,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to switch agent" }, { status: 500 })
  }
}
