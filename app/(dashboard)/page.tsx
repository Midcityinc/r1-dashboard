import { AIChat } from "@/components/ai-chat"
import { AgentSelector } from "@/components/agent-selector"
import { PromptStore } from "@/components/prompt-store"
import { MCPClient } from "@/components/mcp-client"
import { ImageGenerator } from "@/components/image-generator"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AIChat />
        </div>

        <div className="space-y-6">
          <AgentSelector onSelectAgent={(agent) => console.log("Selected agent:", agent)} />
          <ImageGenerator />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PromptStore />
        <MCPClient />
      </div>
    </div>
  )
}
