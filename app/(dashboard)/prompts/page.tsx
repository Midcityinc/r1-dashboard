import { PromptStore } from "@/components/prompt-store"

export default function PromptsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Prompt Store</h1>
      <PromptStore />
    </div>
  )
}
