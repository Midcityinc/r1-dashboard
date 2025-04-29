"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, ImageIcon } from "lucide-react"

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    try {
      setLoading(true)
      setError(null)

      // In a real implementation, this would call the AI SDK
      // For now, we'll simulate a response

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock image URL (in a real app, this would come from the AI SDK)
      const mockImageUrl = "/placeholder.svg?height=512&width=512"

      setImage(mockImageUrl)
    } catch (err) {
      console.error("Image generation failed:", err)
      setError("Failed to generate image. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ImageIcon className="h-5 w-5 mr-2" />
          Image Generator
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Describe the image you want to generate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
            />
            <Button onClick={handleGenerate} disabled={loading || !prompt.trim()}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>

          {error && <div className="text-sm p-2 rounded bg-red-50 text-red-700 border border-red-200">{error}</div>}

          {image && (
            <div className="mt-4 flex justify-center">
              <img
                src={image || "/placeholder.svg"}
                alt={prompt}
                className="rounded-lg shadow-md max-h-[512px] object-contain"
              />
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground">Powered by Gemini 2.0 Flash</CardFooter>
    </Card>
  )
}
