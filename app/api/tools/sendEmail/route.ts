import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { recipient, subject, message } = await request.json()

    // In a real app, this would send an email using a service like SendGrid or Nodemailer

    return NextResponse.json({
      success: true,
      message: `Email sent successfully to ${recipient}`,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 })
  }
}
