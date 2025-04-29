"use client"

import { Tile } from "@/components/ui/tile"
import { useEffect, useState } from "react"
import { Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Tool {
  id: string
  name: string
  status: "connected" | "disconnected" | "error"
  lastSync: string
}

export function ConnectedToolsTile() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTools() {
      try {
        // In a real app, this would be a fetch call to your API
        // const response = await fetch('/api/tools/status');
        // const data = await response.json();

        // Mock data for demonstration
        const mockData = [
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
        ] as Tool[]

        setTools(mockData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching tools:", error)
        setLoading(false)
      }
    }

    fetchTools()
  }, [])

  const formatLastSync = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.round(diffMs / 60000)

    if (diffMins < 60) {
      return `${diffMins}m ago`
    } else if (diffMins < 1440) {
      return `${Math.floor(diffMins / 60)}h ago`
    } else {
      return `${Math.floor(diffMins / 1440)}d ago`
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <Check className="h-4 w-4 text-green-500" />
      case "error":
        return <X className="h-4 w-4 text-red-500" />
      case "disconnected":
        return <X className="h-4 w-4 text-gray-400" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Connected</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Error</Badge>
      case "disconnected":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">Disconnected</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <Tile
      title="Connected Tools"
      summary="Status of integrated tools and services"
      actionLabel="Manage"
      onClick={() => console.log("Manage tools")}
    >
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : (
        <div className="space-y-3">
          {tools.map((tool) => (
            <div key={tool.id} className="flex items-center justify-between p-2 border rounded-md">
              <div className="flex items-center gap-2">
                {getStatusIcon(tool.status)}
                <span className="font-medium">{tool.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{formatLastSync(tool.lastSync)}</span>
                {getStatusBadge(tool.status)}
              </div>
            </div>
          ))}
        </div>
      )}
    </Tile>
  )
}
