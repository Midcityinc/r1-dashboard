"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { useChat } from "ai/react"
import { streamAIText } from "@/lib/ai-sdk"

export type MessagePart = {
  type: "text" | "tool-call" | "tool-result" | "image" | "file" | "source"
  content: string
  metadata?: any
}

export type ParsedMessage = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  parts: MessagePart[]
}

export function useAIChat(options: {
  model?: string
  systemPrompt?: string
  initialMessages?: any[]
  tools?: any[]
  onResponse?: (message: ParsedMessage) => void
}) {
  const { model = "gpt4o", systemPrompt, initialMessages = [], tools = [], onResponse } = options

  const [parsedMessages, setParsedMessages] = useState<ParsedMessage[]>([])

  // Use the AI SDK's useChat hook
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, append, setMessages } = useChat({
    initialMessages,
    onResponse: (response) => {
      // Parse the response into parts
      const parsed = parseMessageParts(response)
      if (onResponse) onResponse(parsed)

      // Add to parsed messages
      setParsedMessages((prev) => [...prev, parsed])
    },
  })

  // Parse message into different parts (text, tool calls, images, etc.)
  const parseMessageParts = useCallback((message: any): ParsedMessage => {
    const parts: MessagePart[] = []

    // Simple parsing logic - in a real implementation, this would be more sophisticated
    // to handle different message formats from different models

    // Check for tool calls
    if (message.content.includes("```json") && message.content.includes("tool_call")) {
      const toolCallMatch = message.content.match(/```json\n([\s\S]*?)\n```/)
      if (toolCallMatch && toolCallMatch[1]) {
        try {
          const toolCall = JSON.parse(toolCallMatch[1])
          parts.push({
            type: "tool-call",
            content: message.content.replace(toolCallMatch[0], ""),
            metadata: toolCall,
          })
        } catch (e) {
          console.error("Failed to parse tool call", e)
        }
      }
    }

    // Check for images
    if (message.content.includes("![") && message.content.includes("](")) {
      const imageMatches = message.content.matchAll(/!\[(.*?)\]$$(.*?)$$/g)
      for (const match of imageMatches) {
        parts.push({
          type: "image",
          content: match[0],
          metadata: { alt: match[1], src: match[2] },
        })
      }
    }

    // Add remaining text as text part
    let textContent = message.content
    parts.forEach((part) => {
      if (part.type !== "text") {
        textContent = textContent.replace(part.content, "")
      }
    })

    if (textContent.trim()) {
      parts.push({
        type: "text",
        content: textContent.trim(),
      })
    }

    return {
      id: message.id,
      role: message.role,
      content: message.content,
      parts: parts.length > 0 ? parts : [{ type: "text", content: message.content }],
    }
  }, [])

  // Parse existing messages
  useEffect(() => {
    const newParsedMessages = messages.map(parseMessageParts)
    setParsedMessages(newParsedMessages)
  }, [messages, parseMessageParts])

  // Custom submit handler that can use different models
  const submitWithModel = useCallback(
    async (e: React.FormEvent<HTMLFormElement>, customModel?: string) => {
      e.preventDefault()

      const selectedModel = customModel || model

      // Add user message
      const userMessage = { role: "user", content: input }
      append(userMessage)

      // Stream response with selected model
      const response = await streamAIText(input, selectedModel, systemPrompt)

      // Add assistant response
      append({ role: "assistant", content: response.text })
    },
    [append, input, model, systemPrompt],
  )

  return {
    messages: parsedMessages,
    input,
    handleInputChange,
    handleSubmit: submitWithModel,
    isLoading,
    error,
    append,
    setMessages,
  }
}
