import { NextResponse } from "next/server"

export async function GET() {
  // In a real app, this would fetch data from a database or calendar API
  const events = [
    {
      id: "1",
      title: "Team Standup",
      date: "2023-04-16",
      time: "09:00",
      duration: "30m",
      type: "meeting",
    },
    {
      id: "2",
      title: "Project Deadline",
      date: "2023-04-18",
      time: "17:00",
      duration: "0m",
      type: "deadline",
    },
    {
      id: "3",
      title: "Client Meeting",
      date: "2023-04-17",
      time: "14:30",
      duration: "60m",
      type: "meeting",
    },
    {
      id: "4",
      title: "Review Documentation",
      date: "2023-04-16",
      time: "13:00",
      duration: "45m",
      type: "reminder",
    },
  ]

  return NextResponse.json(events)
}
