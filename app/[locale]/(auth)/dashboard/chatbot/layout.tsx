// app/dashboard/layout.tsx
import { ChatBotAppSidebar } from "@/components/dashboard/chat/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <SidebarProvider defaultOpen={true}>
      {children}
      <ChatBotAppSidebar user={undefined}/>
    </SidebarProvider>
    </>
  );
}
