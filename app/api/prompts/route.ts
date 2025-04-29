import { NextResponse } from "next/server"

export async function GET() {
  // In a real app, this would fetch data from a database
  const prompts = [
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
  ]

  return NextResponse.json(prompts)
}
