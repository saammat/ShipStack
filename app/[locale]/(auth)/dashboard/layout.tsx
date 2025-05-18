// app/dashboard/layout.tsx
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import {
    SidebarProvider,
  } from "@/components/ui/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      {children}
    </SidebarProvider>
  );
}
