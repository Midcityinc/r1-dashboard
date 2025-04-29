import { ImageGenerator } from "@/components/image-generator"

export default function ImagesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Image Generation</h1>
      <ImageGenerator />
    </div>
  )
}
