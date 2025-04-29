"use client"

import { Tile } from "@/components/ui/tile"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface LogEntry {
  id: string
  timestamp: string
  action: string
  status: "success" | "fail" | "pending"
  details: string
}

export function WorkflowLogTile() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLogs() {
      try {
        // In a real app, this would be a fetch call to your API
        // const response = await fetch('/api/logs');
        // const data = await response.json();

        // Mock data for demonstration
        const mockData = [
          {
            id: "1",
            timestamp: "2023-04-16T10:30:00Z",
            action: "Model Training",
            status: "success",
            details: "Successfully trained model with 98% accuracy",
          },
          {
            id: "2",
            timestamp: "2023-04-16T09:15:00Z",
            action: "Data Processing",
            status: "fail",
            details: "Failed to process data: Invalid format",
          },
          {
            id: "3",
            timestamp: "2023-04-16T08:45:00Z",
            action: "API Integration",
            status: "success",
            details: "Successfully integrated with external API",
          },
          {
            id: "4",
            timestamp: "2023-04-16T07:30:00Z",
            action: "Backup Creation",
            status: "pending",
            details: "Creating backup of training data",
          },
        ] as LogEntry[]

        setLogs(mockData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching logs:", error)
        setLoading(false)
      }
    }

    fetchLogs()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Success</Badge>
      case "fail":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Failed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Pending</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <Tile
      title="Workflow Log"
      summary="Recent activity and status updates"
      actionLabel="View All"
      onClick={() => console.log("View all logs")}
    >
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : (
        <ScrollArea className="h-[220px] pr-4">
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                <div className="text-xs text-muted-foreground whitespace-nowrap">{formatDate(log.timestamp)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">{log.action}</span>
                    {getStatusBadge(log.status)}
                  </div>
                  <p className="text-xs text-muted-foreground">{log.details}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </Tile>
  )
}
