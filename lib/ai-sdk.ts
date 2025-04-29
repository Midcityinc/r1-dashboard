import { generateText, streamText, experimental_generateImage } from "ai"
import { openai } from "@ai-sdk/openai"
import { anthropic } from "@ai-sdk/anthropic"
import { google } from "@ai-sdk/google"

// Model configurations
export const models = {
  // Text generation models
  gpt4o: openai("gpt-4o"),
  claude37: anthropic("claude-3-7-sonnet-20240307"),
  gemini2Flash: google("gemini-2-flash"),

  // Image generation models
  geminiImage: google("gemini-2-flash-vision"),
}

// Generate text with a specific model
export async function generateAIText(prompt: string, model = "gpt4o", systemPrompt?: string) {
  const selectedModel = models[model as keyof typeof models] || models.gpt4o

  const response = await generateText({
    model: selectedModel,
    prompt,
    system: systemPrompt,
  })

  return response
}

// Stream text with a specific model
export async function streamAIText(
  prompt: string,
  model = "gpt4o",
  systemPrompt?: string,
  onChunk?: (chunk: any) => void,
) {
  const selectedModel = models[model as keyof typeof models] || models.gpt4o

  return streamText({
    model: selectedModel,
    prompt,
    system: systemPrompt,
    onChunk,
  })
}

// Generate image with Gemini
export async function generateAIImage(prompt: string) {
  const response = await experimental_generateImage({
    model: models.geminiImage,
    prompt,
  })

  return response
}
