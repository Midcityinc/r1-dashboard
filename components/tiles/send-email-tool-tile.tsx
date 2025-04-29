"use client"

import type React from "react"

import { Tile } from "@/components/ui/tile"
import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function SendEmailToolTile() {
  const [recipient, setRecipient] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      // In a real app, this would be a fetch call to your API
      // const response = await fetch('/api/tools/sendEmail', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ recipient, subject, message })
      // });
      // const data = await response.json();

      // Simulate API call
      console.log(`POST to /api/tools/sendEmail with data:`, { recipient, subject, message })

      // Simulate response
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setResult({
        success: true,
        message: `Email sent successfully to ${recipient}`,
      })

      // Clear form
      setRecipient("")
      setSubject("")
      setMessage("")
    } catch (error) {
      console.error("Error sending email:", error)
      setResult({
        success: false,
        message: "Failed to send email. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Tile title="Send Email Tool" summary="Quickly send emails from the dashboard">
      <form onSubmit={sendEmail} className="space-y-3">
        <div>
          <Label htmlFor="recipient">Recipient</Label>
          <Input
            id="recipient"
            type="email"
            placeholder="email@example.com"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            placeholder="Email subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[80px]"
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Sending..." : "Send Email"}
          <Send className="ml-2 h-4 w-4" />
        </Button>

        {result && (
          <div
            className={`text-sm p-2 rounded ${
              result.success
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            }`}
          >
            {result.message}
          </div>
        )}
      </form>
    </Tile>
  )
}
