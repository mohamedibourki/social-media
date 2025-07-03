import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Calendar,
  ChevronsUpDown,
  Clock,
  Command,
  Frame,
  GalleryVerticalEnd,
  Guitar,
  Home,
  Info,
  Library,
  LifeBuoy,
  Map,
  MessageCircle,
  Plus,
  Send,
  SquareTerminal,
  Users,
} from "lucide-react";

import { NavMain } from "../components/nav-main";
import { NavProjects } from "../components/nav-projects";
import { NavUser } from "../components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const data = {
  user: {
    name: "Saad",
    email: "saadkanani@princeton.com",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: Home,
    },
    {
      title: "Chats",
      url: "/home/chats",
      icon: MessageCircle,
    },
  ],
  quickAccess: [
    {
      name: "Class Schedule",
      url: "/class-schedule",
      icon: Clock,
    },
    {
      name: "Campus Map",
      url: "/map",
      icon: Map,
    },
    {
      name: "Events",
      url: "/events",
      icon: Calendar,
    },
  ],
  academics: [
    {
      name: "Documents",
      url: "/documents",
      icon: Library,
    },
    {
      name: "Academic Records",
      url: "/records",
      icon: BookOpen,
    },
  ],
  studentLife: [
    {
      name: "Clubs & Societies",
      url: "/clubs",
      icon: Guitar,
    },
    {
      name: "Student Services",
      url: "/services",
      icon: Users,
    },
    {
      name: "Career Center",
      url: "/career",
      icon: Frame,
    },
  ],
  support: [
    {
      name: "Student Resources",
      url: "/resources",
      icon: Info,
    },
    {
      name: "IT Help Desk",
      url: "/it-support",
      icon: SquareTerminal,
    },
    {
      name: "Support",
      url: "/support",
      icon: LifeBuoy,
    },
    {
      name: "FAQ",
      url: "/faq",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeTeam, setActiveTeam] = React.useState(data.teams[0]);
  const { isMobile } = useSidebar();

  return (
    <Sidebar variant="inset" {...props} collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <activeTeam.logo className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {activeTeam.name}
                    </span>
                    <span className="truncate text-xs">{activeTeam.plan}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="end"
                side={isMobile ? "bottom" : "right"}
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Teams
                </DropdownMenuLabel>
                {data.teams.map((team, index) => (
                  <DropdownMenuItem
                    key={team.name}
                    onClick={() => setActiveTeam(team)}
                    className="gap-2 p-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      <team.logo className="size-4 shrink-0" />
                    </div>
                    {team.name}
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">
                    Add team
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects title="Quick Access" projects={data.quickAccess} />
        <NavProjects title="Academics" projects={data.academics} />
        <NavProjects title="Student Life" projects={data.studentLife} />
        <NavProjects title="Support" projects={data.support} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
