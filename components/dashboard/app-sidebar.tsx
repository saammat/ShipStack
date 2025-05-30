"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  BadgeCheck,
  CreditCard
} from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavUserMenus } from "@/components/dashboard/nav-user-menus"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("dashboard.sidebar")

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
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
        title: t("main.playground.title"),
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          { title: t("main.playground.chatbot"), url: "/dashboard/chatbot" },
          { title: t("main.playground.starred"), url: "#" },
          { title: t("main.playground.settings"), url: "#" },
        ],
      },
      {
        title: t("main.models.title"),
        url: "#",
        icon: Bot,
        items: [
          { title: t("main.models.genesis"), url: "#" },
          { title: t("main.models.explorer"), url: "#" },
          { title: t("main.models.quantum"), url: "#" },
        ],
      },
      {
        title: t("main.docs.title"),
        url: "#",
        icon: BookOpen,
        items: [
          { title: t("main.docs.intro"), url: "#" },
          { title: t("main.docs.getStarted"), url: "#" },
          { title: t("main.docs.tutorials"), url: "#" },
          { title: t("main.docs.changelog"), url: "#" },
        ],
      },
      {
        title: t("main.settings.title"),
        url: "#",
        icon: Settings2,
        items: [
          { title: t("main.settings.general"), url: "#" },
          { title: t("main.settings.team"), url: "#" },
          { title: t("main.settings.billing"), url: "#" },
          { title: t("main.settings.limits"), url: "#" },
        ],
      },
    ],
    userMenus: [
      { name: t("userMenus.account"), url: "/dashboard/account", icon: BadgeCheck },
      { name: t("userMenus.billing"), url: "/dashboard/billing", icon: CreditCard },
      { name: t("userMenus.creditsDetail"), url: "/dashboard/creditsDetail", icon: Map },
    ],
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image src="/shipstack.png" alt="ShipStack Logo" width={32} height={32}  className="dark:invert dark:brightness-0 dark:hover:opacity-80 hover:opacity-70 transition-opacity" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">ShipStack</span>
                  <span className="truncate text-xs">{t("console")}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavUserMenus userMenus={data.userMenus} />
      </SidebarContent>
      
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
