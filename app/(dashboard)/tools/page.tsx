import { MCPClient } from "@/components/mcp-client"

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">MCP Tools</h1>
      <MCPClient />
    </div>
  )
}
