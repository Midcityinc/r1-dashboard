"use client"

import { Tile } from "@/components/ui/tile"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

interface Project {
  id: string
  name: string
  status: "active" | "completed" | "on-hold"
  progress: number
}

export function ProjectOverviewTile() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        // In a real app, this would be a fetch call to your API
        // const response = await fetch('/api/projects');
        // const data = await response.json();

        // Mock data for demonstration
        const mockData = [
          { id: "1", name: "AI Chatbot Integration", status: "active", progress: 75 },
          { id: "2", name: "Data Pipeline Optimization", status: "on-hold", progress: 45 },
          { id: "3", name: "ML Model Training", status: "completed", progress: 100 },
        ] as Project[]

        setProjects(mockData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching projects:", error)
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "on-hold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <Tile
      title="Project Overview"
      summary="Current project status and progress"
      actionLabel="View All"
      onClick={() => console.log("View all projects")}
    >
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{project.name}</span>
                <Badge className={getStatusColor(project.status)}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={project.progress} className="h-2" />
                <span className="text-xs text-muted-foreground w-8">{project.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Tile>
  )
}
