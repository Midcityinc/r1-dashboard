"use client"

import { Tile } from "@/components/ui/tile"
import { useEffect, useState } from "react"
import { Bookmark, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Prompt {
  id: string
  title: string
  content: string
  category: string
}

export function PromptStoreTile() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPrompts() {
      try {
        // In a real app, this would be a fetch call to your API
        // const response = await fetch('/api/prompts');
        // const data = await response.json();

        // Mock data for demonstration
        const mockData = [
          {
            id: "1",
            title: "Content Summarization",
            content: "Summarize the following text in 3 bullet points, highlighting the key insights...",
            category: "Summarization",
          },
          {
            id: "2",
            title: "Code Explanation",
            content: "Explain the following code snippet in simple terms, focusing on what it does...",
            category: "Code",
          },
          {
            id: "3",
            title: "Data Analysis",
            content: "Analyze this dataset and provide insights on trends, anomalies, and potential actions...",
            category: "Analysis",
          },
        ] as Prompt[]

        setPrompts(mockData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching prompts:", error)
        setLoading(false)
      }
    }

    fetchPrompts()
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  return (
    <Tile
      title="Prompt Store"
      summary="Reusable AI prompts for common tasks"
      actionLabel="Add New"
      onClick={() => console.log("Add new prompt")}
    >
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : (
        <ScrollArea className="h-[220px] pr-4">
          <div className="space-y-4">
            {prompts.map((prompt) => (
              <div key={prompt.id} className="p-3 border rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium text-sm">{prompt.title}</h4>
                  <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">{prompt.category}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{prompt.content}</p>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => copyToClipboard(prompt.content)}>
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy prompt</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Bookmark className="h-4 w-4" />
                    <span className="sr-only">Save prompt</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </Tile>
  )
}
