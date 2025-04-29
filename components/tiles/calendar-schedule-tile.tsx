"use client"

import { Tile } from "@/components/ui/tile"
import { useEffect, useState } from "react"
import { Calendar, Clock } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  duration: string
  type: "meeting" | "deadline" | "reminder"
}

export function CalendarScheduleTile() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      try {
        // In a real app, this would be a fetch call to your API
        // const response = await fetch('/api/calendar/events');
        // const data = await response.json();

        // Mock data for demonstration
        const mockData = [
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
        ] as CalendarEvent[]

        setEvents(mockData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching calendar events:", error)
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "border-blue-400 bg-blue-50 dark:bg-blue-950"
      case "deadline":
        return "border-red-400 bg-red-50 dark:bg-red-950"
      case "reminder":
        return "border-yellow-400 bg-yellow-50 dark:bg-yellow-950"
      default:
        return "border-gray-400 bg-gray-50 dark:bg-gray-900"
    }
  }

  return (
    <Tile
      title="Calendar Schedule"
      summary="Upcoming events and deadlines"
      actionLabel="View Calendar"
      onClick={() => console.log("View calendar")}
    >
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : (
        <ScrollArea className="h-[220px] pr-4">
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className={`p-3 border-l-4 rounded-md ${getEventTypeColor(event.type)}`}>
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(event.date)}
                  </div>
                </div>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {event.time} {event.duration !== "0m" && `(${event.duration})`}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </Tile>
  )
}
