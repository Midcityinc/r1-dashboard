"use client"

import { Tile } from "@/components/ui/tile"
import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface Agent {
  id: string
  name: string
  description: string
  capabilities: string[]
  isActive: boolean
}

export function AIAgentSelectorTile() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

  useEffect(() => {
    async function fetchAgents() {
      try {
        // In a real app, this would be a fetch call to your API
        // const response = await fetch('/api/agents');
        // const data = await response.json();

        // Mock data for demonstration
        const mockData = [
          {
            id: "1",
            name: "Research Assistant",
            description: "Specialized in deep research and data analysis",
            capabilities: ["Web Search", "Data Analysis", "Citation"],
            isActive: true,
          },
          {
            id: "2",
            name: "Content Creator",
            description: "Creates engaging content across multiple formats",
            capabilities: ["Writing", "Editing", "SEO Optimization"],
            isActive: false,
          },
          {
            id: "3",
            name: "Code Assistant",
            description: "Helps with coding tasks and debugging",
            capabilities: ["Code Generation", "Debugging", "Documentation"],
            isActive: false,
          },
        ] as Agent[]

        setAgents(mockData)
        setSelectedAgent(mockData.find((agent) => agent.isActive) || null)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching agents:", error)
        setLoading(false)
      }
    }

    fetchAgents()
  }, [])

  const switchAgent = async (agent: Agent) => {
    try {
      // In a real app, this would be a fetch call to your API
      // await fetch('/api/agents/switch', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ agentId: agent.id })
      // });

      // Simulate API call
      console.log(`POST to /api/agents/switch with agent ID: ${agent.id}`)

      // Update local state
      setAgents((prev) =>
        prev.map((a) => ({
          ...a,
          isActive: a.id === agent.id,
        })),
      )
      setSelectedAgent(agent)
    } catch (error) {
      console.error("Error switching agent:", error)
    }
  }

  return (
    <Tile title="AI Agent Selector" summary="Choose the right AI agent for your task">
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {selectedAgent?.name || "Select an agent"}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
              {agents.map((agent) => (
                <DropdownMenuItem
                  key={agent.id}
                  onClick={() => switchAgent(agent)}
                  className="flex items-center justify-between"
                >
                  {agent.name}
                  {agent.isActive && <Check className="h-4 w-4 ml-2" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {selectedAgent && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">{selectedAgent.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedAgent.capabilities.map((capability, index) => (
                  <Badge key={index} variant="secondary">
                    {capability}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Tile>
  )
}
