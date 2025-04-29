"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

type ToolCallProps = {
  toolCall: {
    name: string
    arguments: Record<string, any>
  }
  onResult: (result: any) => void
}

export function ToolCallHandler({ toolCall, onResult }: ToolCallProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [result, setResult] = useState<any>(null)

  const executeToolCall = async () => {
    try {
      setStatus("loading")

      // In a real implementation, this would call the appropriate API
      // based on the tool name (Zapier, Composio, etc.)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock result based on tool name
      let mockResult

      switch (toolCall.name) {
        case "search_google":
          mockResult = {
            success: true,
            results: [
              { title: "Search Result 1", url: "https://example.com/1" },
              { title: "Search Result 2", url: "https://example.com/2" },
            ],
          }
          break

        case "send_email":
          mockResult = {
            success: true,
            messageId: "msg_" + Math.random().toString(36).substring(2, 9),
            sentTo: toolCall.arguments.to,
          }
          break

        case "create_calendar_event":
          mockResult = {
            success: true,
            eventId: "evt_" + Math.random().toString(36).substring(2, 9),
            title: toolCall.arguments.title,
            start: toolCall.arguments.start,
          }
          break

        default:
          mockResult = {
            success: true,
            message: `Executed ${toolCall.name} successfully`,
            timestamp: new Date().toISOString(),
          }
      }

      setResult(mockResult)
      setStatus("success")
      onResult(mockResult)
    } catch (error) {
      console.error("Tool execution failed:", error)
      setStatus("error")
      setResult({ success: false, error: "Tool execution failed" })
      onResult({ success: false, error: "Tool execution failed" })
    }
  }

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center">
          {status === "success" && <CheckCircle className="h-4 w-4 mr-2 text-green-500" />}
          {status === "error" && <XCircle className="h-4 w-4 mr-2 text-red-500" />}
          Tool Call: {toolCall.name}
        </CardTitle>
        <CardDescription>Execute this tool with the provided arguments</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto">
          <pre>{JSON.stringify(toolCall.arguments, null, 2)}</pre>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        {status === "idle" && <Button onClick={executeToolCall}>Execute Tool</Button>}

        {status === "loading" && (
          <Button disabled>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Executing...
          </Button>
        )}

        {(status === "success" || status === "error") && (
          <div className="w-full">
            <div
              className={`text-sm p-2 rounded ${
                status === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {status === "success" ? "Tool executed successfully" : "Tool execution failed"}
            </div>

            {result && (
              <div className="mt-2 bg-muted p-2 rounded-md text-sm font-mono overflow-x-auto">
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
