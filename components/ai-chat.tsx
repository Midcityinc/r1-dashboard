"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Send, User, Bot, FileText, Link } from "lucide-react"
import { useAIChat, type MessagePart, type ParsedMessage } from "@/hooks/use-ai-chat"
import { ToolCallHandler } from "@/components/tool-call-handler"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

type AIModel = "gpt4o" | "claude37" | "gemini2Flash"

type AIAgent = {
  id: string
  name: string
  description: string
  model: AIModel
  systemPrompt: string
  tools: string[]
}

type AIChatProps = {
  agent?: AIAgent
  initialMessages?: any[]
}

export function AIChat({ agent, initialMessages = [] }: AIChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [toolResults, setToolResults] = useState<Record<string, any>>({})

  // Default agent if none provided
  const defaultAgent: AIAgent = {
    id: "default",
    name: "R1 Assistant",
    description: "General purpose AI assistant",
    model: "gpt4o",
    systemPrompt: "You are R1, a helpful AI assistant. Answer questions concisely and accurately.",
    tools: [],
  }

  const selectedAgent = agent || defaultAgent

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useAIChat({
    model: selectedAgent.model,
    systemPrompt: selectedAgent.systemPrompt,
    initialMessages,
    tools: selectedAgent.tools,
  })

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Handle tool call results
  const handleToolResult = (toolCallId: string, result: any) => {
    setToolResults((prev) => ({
      ...prev,
      [toolCallId]: result,
    }))
  }

  // Render different message part types
  const renderMessagePart = (part: MessagePart, index: number) => {
    switch (part.type) {
      case "text":
        return (
          <div key={index} className="prose prose-sm dark:prose-invert max-w-none">
            {part.content}
          </div>
        )

      case "tool-call":
        const toolCall = part.metadata
        const toolCallId = toolCall.id || `tool-${index}`
        return (
          <div key={index} className="my-2">
            <ToolCallHandler toolCall={toolCall} onResult={(result) => handleToolResult(toolCallId, result)} />
          </div>
        )

      case "image":
        return (
          <div key={index} className="my-2">
            <img
              src={part.metadata?.src || ""}
              alt={part.metadata?.alt || "Generated image"}
              className="rounded-lg max-h-[300px] object-contain"
            />
          </div>
        )

      case "file":
        return (
          <div key={index} className="my-2 flex items-center p-2 bg-muted rounded-md">
            <FileText className="h-5 w-5 mr-2" />
            <span>{part.metadata?.filename || "File"}</span>
          </div>
        )

      case "source":
        return (
          <div key={index} className="my-2 flex items-center p-2 bg-muted rounded-md">
            <Link className="h-5 w-5 mr-2" />
            <a
              href={part.metadata?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {part.metadata?.title || part.metadata?.url || "Source"}
            </a>
          </div>
        )

      default:
        return <div key={index}>{part.content}</div>
    }
  }

  return (
    <Card className="w-full h-[calc(100vh-12rem)] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>R1</AvatarFallback>
          </Avatar>
          {selectedAgent.name}
          <Badge variant="outline" className="ml-2 text-xs">
            {selectedAgent.model}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full p-4" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <Bot className="h-12 w-12 mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">How can I help you today?</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-md">
                Ask me anything or request assistance with tasks, research, or creative work.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message: ParsedMessage) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div
                      className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground ml-2"
                          : "bg-muted text-muted-foreground mr-2"
                      }`}
                    >
                      {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>

                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {message.parts.map(renderMessagePart)}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex flex-row">
                    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-muted text-muted-foreground mr-2">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="rounded-lg px-4 py-2 bg-muted flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </CardContent>

      <CardFooter className="pt-0">
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
