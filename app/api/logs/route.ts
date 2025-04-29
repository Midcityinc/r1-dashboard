import { NextResponse } from "next/server"

export async function GET() {
  // In a real app, this would fetch data from a database
  const logs = [
    {
      id: "1",
      timestamp: "2023-04-16T10:30:00Z",
      action: "Model Training",
      status: "success",
      details: "Successfully trained model with 98% accuracy",
    },
    {
      id: "2",
      timestamp: "2023-04-16T09:15:00Z",
      action: "Data Processing",
      status: "fail",
      details: "Failed to process data: Invalid format",
    },
    {
      id: "3",
      timestamp: "2023-04-16T08:45:00Z",
      action: "API Integration",
      status: "success",
      details: "Successfully integrated with external API",
    },
    {
      id: "4",
      timestamp: "2023-04-16T07:30:00Z",
      action: "Backup Creation",
      status: "pending",
      details: "Creating backup of training data",
    },
  ]

  return NextResponse.json(logs)
}
