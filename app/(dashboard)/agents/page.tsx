import { AgentSelector } from "@/components/agent-selector"
import { AIChat } from "@/components/ai-chat"

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">AI Agents</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <AgentSelector onSelectAgent={(agent) => console.log("Selected agent:", agent)} />
        </div>

        <div className="lg:col-span-2">
          <AIChat />
        </div>
      </div>
    </div>
  )
}
