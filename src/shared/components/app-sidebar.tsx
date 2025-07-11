import * as React from "react"
import {
  // IconCamera,
  // IconChartBar,
  // IconDatabase,
  // IconFileAi,
  // IconFileDescription,
  // IconFileWord,
  // IconFolder,
  // IconInnerShadowTop,
  // IconReport,
  // IconUsers,
  // IconDashboard,
  IconHelp,
  IconListDetails,
  IconMessageCircle,
  // IconSettings,
} from "@tabler/icons-react"

import { NavMain } from "@/shared/components/nav-main"
import { NavSecondary } from "@/shared/components/nav-secondary"
import { NavUser } from "@/shared/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar"
import { Scale } from "lucide-react"

const data = {
  navMain: [
    // {
    //   title: "Dashboard",
    //   url: "#",
    //   icon: IconDashboard,
    // },
    {
      title: "Biblioteca de Agentes",
      url: "/agents",
      icon: IconListDetails,
    },
    {
      title: "Chats",
      url: "/chats",
      icon: IconMessageCircle,
    },
    // {
    //   title: "Analytics",
    //   url: "#",
    //   icon: IconChartBar,
    // },
    // {
    //   title: "Projects",
    //   url: "#",
    //   icon: IconFolder,
    // },
    // {
    //   title: "Team",
    //   url: "#",
    //   icon: IconUsers,
    // },
  ],
  navSecondary: [
    // {
    //   title: "Configurações",
    //   url: "#settings",
    //   icon: IconSettings,
    // },
    {
      title: "Preciso de ajuda",
      url: "https://wa.me/5511913337009",
      icon: IconHelp,
    }
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    name: string
    email: string
    avatar: string
  }
  onLogout: () => void
}

export function AppSidebar({ user, onLogout, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <div className="flex items-center h-full space-x-1.5">
                <div className="flex items-center justify-center w-7 h-7 bg-primary rounded-lg">
                  <Scale className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold font-playfair">EliaAI</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} onLogout={onLogout} />
      </SidebarFooter>
    </Sidebar>
  )
}
