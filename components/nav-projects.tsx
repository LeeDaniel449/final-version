"use client"

import type * as React from "react"
import Link from "next/link"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type Project = {
  name: string
  url: string
  icon?: React.ComponentType<{ className?: string }>
}

interface NavProjectsProps {
  projects: Project[]
}

/**
 * Quick-access list for user projects/goals shown in the sidebar.
 */
export function NavProjects({ projects }: NavProjectsProps) {
  if (!projects?.length) return null

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {projects.map((project) => (
            <SidebarMenuItem key={project.name}>
              <SidebarMenuButton asChild size="sm">
                <Link href={project.url}>
                  {project.icon && <project.icon className="size-4" />}
                  <span>{project.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
