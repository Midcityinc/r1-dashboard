"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Plus, Copy, Star, StarOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Prompt = {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  isFavorite: boolean
}

export function PromptStore() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    // Fetch prompts from API or use mock data
    const fetchPrompts = async () => {
      try {
        // In a real app, this would be a fetch call
        // const response = await fetch('/api/prompts')
        // const data = await response.json()

        // Mock data
        const mockPrompts: Prompt[] = [
          {
            id: "1",
            title: "Research Assistant",
            content:
              "You are a research assistant. Help me find information about {topic}. Provide detailed analysis and cite your sources.",
            category: "Research",
            tags: ["academic", "analysis"],
            isFavorite: true,
          },
          {
            id: "2",
            title: "Code Explainer",
            content:
              "Explain the following code in simple terms:\n\n```\n{code}\n```\n\nFocus on what it does, not line-by-line explanation.",
            category: "Development",
            tags: ["code", "explanation"],
            isFavorite: false,
          },
          {
            id: "3",
            title: "Meeting Summarizer",
            content:
              "Summarize the following meeting transcript into key points, action items, and decisions made:\n\n{transcript}",
            category: "Productivity",
            tags: ["meetings", "summary"],
            isFavorite: true,
          },
          {
            id: "4",
            title: "Email Composer",
            content:
              "Draft a professional email to {recipient} regarding {subject}. The tone should be {tone} and include the following points: {points}",
            category: "Communication",
            tags: ["email", "writing"],
            isFavorite: false,
          },
          {
            id: "5",
            title: "Data Analyzer",
            content:
              "Analyze the following data and provide insights:\n\n{data}\n\nFocus on trends, anomalies, and actionable recommendations.",
            category: "Analysis",
            tags: ["data", "insights"],
            isFavorite: false,
          },
        ]

        setPrompts(mockPrompts)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch prompts:", error)
        setLoading(false)
      }
    }

    fetchPrompts()
  }, [])

  // Get unique categories
  const categories = Array.from(new Set(prompts.map((p) => p.category)))

  // Filter prompts based on search and category
  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch =
      searchQuery === "" ||
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === null || prompt.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setPrompts(prompts.map((prompt) => (prompt.id === id ? { ...prompt, isFavorite: !prompt.isFavorite } : prompt)))
  }

  // Copy prompt to clipboard
  const copyPrompt = (content: string) => {
    navigator.clipboard.writeText(content)
    // In a real app, you would show a toast notification here
  }

  return (
    <Card className="w-full h-[calc(100vh-12rem)] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          Prompt Store
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            New Prompt
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <div className="p-4 border-b">
          <div className="flex space-x-2 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <ScrollArea className="whitespace-nowrap pb-2" orientation="horizontal">
            <div className="flex space-x-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>

              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <ScrollArea className="h-[calc(100%-7rem)] p-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredPrompts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <p className="text-muted-foreground">No prompts found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPrompts.map((prompt) => (
                <div key={prompt.id} className="p-3 border rounded-md hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{prompt.title}</h3>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleFavorite(prompt.id)}>
                        {prompt.isFavorite ? (
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        ) : (
                          <StarOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => copyPrompt(prompt.content)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground mb-2 line-clamp-2">{prompt.content}</div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{prompt.category}</Badge>
                    {prompt.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
