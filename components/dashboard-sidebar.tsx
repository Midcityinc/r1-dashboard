"use client"

import { LayoutDashboard, Users, MessageSquareText, Zap, ImageIcon, FileText, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function DashboardSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Agents",
      href: "/agents",
      icon: Users,
    },
    {
      name: "Prompt Store",
      href: "/prompts",
      icon: MessageSquareText,
    },
    {
      name: "MCP Tools",
      href: "/tools",
      icon: Zap,
    },
    {
      name: "Image Generation",
      href: "/images",
      icon: ImageIcon,
    },
    {
      name: "Logs",
      href: "/logs",
      icon: FileText,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center py-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">R1 Dashboard</span>
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.name}>
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-xs text-center text-muted-foreground">R1 Dashboard v1.0</div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
