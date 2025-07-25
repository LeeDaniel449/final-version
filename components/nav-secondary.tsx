"use client"

import type * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type SecondaryItem = {
  title: string
  url: string
  icon?: React.ComponentType<{ className?: string }>
}

interface NavSecondaryProps extends React.ComponentPropsWithoutRef<"div"> {
  items: SecondaryItem[]
}

/**
 * Secondary/help navigation section (e.g. Support, Feedback).
 */
export function NavSecondary({ items, className, ...props }: NavSecondaryProps) {
  if (!items?.length) return null

  return (
    <SidebarGroup className={cn(className)} {...props}>
      <SidebarGroupLabel>More</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm">
                <Link href={item.url}>
                  {item.icon && <item.icon className="size-4" />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
