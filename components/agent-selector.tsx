"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, Bot, Brain, Sparkles, Code, Search, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type AIModel = "gpt4o" | "claude37" | "gemini2Flash"

type AIAgent = {
  id: string
  name: string
  description: string
  model: AIModel
  systemPrompt: string
  capabilities: string[]
  tools: string[]
  isActive: boolean
}

type AgentSelectorProps = {
  onSelectAgent: (agent: AIAgent) => void
}

export function AgentSelector({ onSelectAgent }: AgentSelectorProps) {
  const [agents, setAgents] = useState<AIAgent[]>([
    {
      id: "research-assistant",
      name: "Research Assistant",
      description: "Specialized in deep research and data analysis",
      model: "claude37",
      systemPrompt: "You are a research assistant specialized in finding accurate information and citing sources.",
      capabilities: ["Web Search", "Data Analysis", "Citation"],
      tools: ["search_google", "analyze_data", "cite_sources"],
      isActive: true,
    },
    {
      id: "code-assistant",
      name: "Code Assistant",
      description: "Helps with coding tasks and debugging",
      model: "gpt4o",
      systemPrompt:
        "You are a coding assistant specialized in helping with programming tasks, debugging, and explaining code.",
      capabilities: ["Code Generation", "Debugging", "Documentation"],
      tools: ["generate_code", "debug_code", "explain_code"],
      isActive: false,
    },
    {
      id: "creative-writer",
      name: "Creative Writer",
      description: "Generates creative content and ideas",
      model: "claude37",
      systemPrompt:
        "You are a creative writing assistant specialized in generating engaging content across various formats.",
      capabilities: ["Content Creation", "Storytelling", "Editing"],
      tools: ["generate_content", "edit_content", "brainstorm_ideas"],
      isActive: false,
    },
    {
      id: "data-analyst",
      name: "Data Analyst",
      description: "Analyzes data and provides insights",
      model: "gpt4o",
      systemPrompt:
        "You are a data analysis assistant specialized in interpreting data and providing actionable insights.",
      capabilities: ["Data Visualization", "Statistical Analysis", "Trend Identification"],
      tools: ["analyze_data", "visualize_data", "identify_trends"],
      isActive: false,
    },
    {
      id: "document-processor",
      name: "Document Processor",
      description: "Extracts and processes information from documents",
      model: "gemini2Flash",
      systemPrompt:
        "You are a document processing assistant specialized in extracting and organizing information from various document types.",
      capabilities: ["Text Extraction", "Summarization", "Information Organization"],
      tools: ["extract_text", "summarize_document", "organize_information"],
      isActive: false,
    },
  ])

  const selectAgent = (agentId: string) => {
    // Update active state
    const updatedAgents = agents.map((agent) => ({
      ...agent,
      isActive: agent.id === agentId,
    }))

    setAgents(updatedAgents)

    // Call the onSelectAgent callback with the selected agent
    const selectedAgent = updatedAgents.find((agent) => agent.id === agentId)
    if (selectedAgent) {
      onSelectAgent(selectedAgent)
    }
  }

  const getAgentIcon = (agentId: string) => {
    switch (agentId) {
      case "research-assistant":
        return <Search className="h-5 w-5" />
      case "code-assistant":
        return <Code className="h-5 w-5" />
      case "creative-writer":
        return <Sparkles className="h-5 w-5" />
      case "data-analyst":
        return <Brain className="h-5 w-5" />
      case "document-processor":
        return <FileText className="h-5 w-5" />
      default:
        return <Bot className="h-5 w-5" />
    }
  }

  const getModelBadge = (model: AIModel) => {
    switch (model) {
      case "gpt4o":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300">
            GPT-4o
          </Badge>
        )
      case "claude37":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
            Claude 3.7
          </Badge>
        )
      case "gemini2Flash":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            Gemini 2.0 Flash
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle>AI Agents</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[400px] p-4">
          <div className="space-y-4">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`p-3 border rounded-md hover:shadow-sm transition-shadow cursor-pointer ${
                  agent.isActive ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => selectAgent(agent.id)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${
                      agent.isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {getAgentIcon(agent.id)}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium flex items-center gap-2">
                          {agent.name}
                          {getModelBadge(agent.model)}
                        </h3>
                        <p className="text-sm text-muted-foreground">{agent.description}</p>
                      </div>

                      {agent.isActive && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {agent.capabilities.map((capability) => (
                        <Badge key={capability} variant="secondary">
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
