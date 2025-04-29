"use client"

import type React from "react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface TileProps {
  title: string
  summary?: string
  actionLabel?: string
  onClick?: () => void
  className?: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export function Tile({ title, summary, actionLabel, onClick, className, children, footer }: TileProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={cn(
        "transition-all duration-200 h-full flex flex-col",
        isHovered ? "transform scale-[1.02] shadow-lg" : "",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {summary && <p className="text-sm text-muted-foreground">{summary}</p>}
      </CardHeader>
      <CardContent className="flex-1">{children}</CardContent>
      {(actionLabel || footer) && (
        <CardFooter className="flex justify-between items-center pt-2">
          {footer}
          {actionLabel && (
            <Button onClick={onClick} className="ml-auto">
              {actionLabel}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
