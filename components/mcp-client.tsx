"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Check, X, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Tool = {
  id: string
  name: string
  provider: "zapier" | "composio" | "custom"
  description: string
  status: "connected" | "disconnected" | "error"
  lastUsed?: string
}

type ToolExecution = {
  id: string
  toolId: string
  toolName: string
  status: "pending" | "success" | "error"
  input: Record<string, any>
  output?: Record<string, any>
  timestamp: string
}

export function MCPClient() {
  const [tools, setTools] = useState<Tool[]>([
    {
      id: "zapier-gmail",
      name: "Send Gmail",
      provider: "zapier",
      description: "Send emails through Gmail",
      status: "connected",
      lastUsed: "2023-04-15T10:30:00Z",
    },
    {
      id: "zapier-calendar",
      name: "Google Calendar",
      provider: "zapier",
      description: "Create and manage calendar events",
      status: "connected",
      lastUsed: "2023-04-14T15:45:00Z",
    },
    {
      id: "composio-search",
      name: "Web Search",
      provider: "composio",
      description: "Search the web for information",
      status: "connected",
      lastUsed: "2023-04-16T09:20:00Z",
    },
    {
      id: "zapier-slack",
      name: "Slack Messages",
      provider: "zapier",
      description: "Send messages to Slack channels",
      status: "error",
      lastUsed: "2023-04-10T11:15:00Z",
    },
    {
      id: "custom-api",
      name: "Custom API",
      provider: "custom",
      description: "Call custom API endpoints",
      status: "disconnected",
    },
  ])

  const [executions, setExecutions] = useState<ToolExecution[]>([
    {
      id: "exec-1",
      toolId: "zapier-gmail",
      toolName: "Send Gmail",
      status: "success",
      input: { to: "user@example.com", subject: "Meeting Reminder", body: "Don't forget our meeting tomorrow at 2pm." },
      output: { messageId: "msg_123456", status: "sent" },
      timestamp: "2023-04-15T10:30:00Z",
    },
    {
      id: "exec-2",
      toolId: "composio-search",
      toolName: "Web Search",
      status: "success",
      input: { query: "latest AI developments" },
      output: { results: [{ title: "New AI Models Released", url: "https://example.com/ai-news" }] },
      timestamp: "2023-04-16T09:20:00Z",
    },
    {
      id: "exec-3",
      toolId: "zapier-slack",
      toolName: "Slack Messages",
      status: "error",
      input: { channel: "#general", message: "Project update" },
      output: { error: "Authentication failed" },
      timestamp: "2023-04-10T11:15:00Z",
    },
  ])

  const [loading, setLoading] = useState(false)

  const refreshConnections = async () => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Update tool statuses (in a real app, this would come from the API)
    setTools(
      tools.map((tool) => ({
        ...tool,
        status: Math.random() > 0.2 ? "connected" : Math.random() > 0.5 ? "error" : "disconnected",
      })),
    )

    setLoading(false)
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
      case "success":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            <Check className="h-3 w-3 mr-1" /> {status === "connected" ? "Connected" : "Success"}
          </Badge>
        )

      case "error":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            <X className="h-3 w-3 mr-1" /> Error
          </Badge>
        )

      case "disconnected":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">Disconnected</Badge>

      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" /> Pending
          </Badge>
        )

      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getProviderBadge = (provider: string) => {
    switch (provider) {
      case "zapier":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            Zapier
          </Badge>
        )

      case "composio":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
            Composio
          </Badge>
        )

      case "custom":
        return <Badge variant="outline">Custom</Badge>

      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card className="w-full h-[calc(100vh-12rem)] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          MCP Client
          <Button size="sm" variant="outline" onClick={refreshConnections} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <Tabs defaultValue="tools" className="h-full flex flex-col">
          <div className="border-b px-4">
            <TabsList className="h-10">
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="executions">Executions</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="tools" className="flex-1 p-0 m-0">
            <div className="p-4 border-b">
              <div className="relative">
                <Input placeholder="Search tools..." className="pl-8" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>

            <ScrollArea className="h-[calc(100%-7rem)] p-4">
              <div className="space-y-4">
                {tools.map((tool) => (
                  <div key={tool.id} className="p-3 border rounded-md hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium flex items-center">
                          {tool.name}
                          {getProviderBadge(tool.provider)}
                        </h3>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                      <div>{getStatusBadge(tool.status)}</div>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <div className="text-xs text-muted-foreground">
                        {tool.lastUsed ? `Last used: ${formatTimestamp(tool.lastUsed)}` : "Never used"}
                      </div>
                      <Button size="sm" variant="outline">
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="executions" className="flex-1 p-0 m-0">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {executions.map((execution) => (
                  <div key={execution.id} className="p-3 border rounded-md hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{execution.toolName}</h3>
                        <p className="text-xs text-muted-foreground">{formatTimestamp(execution.timestamp)}</p>
                      </div>
                      <div>{getStatusBadge(execution.status)}</div>
                    </div>

                    <div className="mt-2">
                      <div className="text-xs font-medium mb-1">Input:</div>
                      <div className="bg-muted p-2 rounded-md text-xs font-mono overflow-x-auto">
                        <pre>{JSON.stringify(execution.input, null, 2)}</pre>
                      </div>
                    </div>

                    {execution.output && (
                      <div className="mt-2">
                        <div className="text-xs font-medium mb-1">Output:</div>
                        <div className="bg-muted p-2 rounded-md text-xs font-mono overflow-x-auto">
                          <pre>{JSON.stringify(execution.output, null, 2)}</pre>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
