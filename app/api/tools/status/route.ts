import { NextResponse } from "next/server"

export async function GET() {
  // In a real app, this would fetch data from a database
  const tools = [
    {
      id: "1",
      name: "Google Drive",
      status: "connected",
      lastSync: "2023-04-16T10:30:00Z",
    },
    {
      id: "2",
      name: "Slack",
      status: "connected",
      lastSync: "2023-04-16T09:45:00Z",
    },
    {
      id: "3",
      name: "GitHub",
      status: "error",
      lastSync: "2023-04-15T14:20:00Z",
    },
    {
      id: "4",
      name: "Notion",
      status: "disconnected",
      lastSync: "2023-04-10T08:15:00Z",
    },
  ]

  return NextResponse.json(tools)
}
