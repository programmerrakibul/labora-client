import Logo from "@/components/shared/logo";
import ThemeToggle from "@/components/shared/theme-toggle";
import UserMenu from "@/components/shared/user-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import useAuth from "@/stores/auth";
import useSidebarStore, { setSidebarOpen } from "@/stores/sidebar";
import { Outlet, useLocation } from "react-router";
import DashboardSidebar from "./DashboardSidebar";
import { getNavItems } from "./dashboard-nav";

const DashboardLayout = () => {
  const user = useAuth((s) => s.user);
  const { pathname } = useLocation();
  const open = useSidebarStore((s) => s.open);

  const currentNavItem = getNavItems(user?.role).find(
    (item) => pathname === item.to
  );

  return (
    <SidebarProvider
      open={open}
      onOpenChange={setSidebarOpen}
      className="h-svh overflow-hidden"
    >
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4" />
          <h2 className="hidden text-sm font-medium text-muted-foreground lg:block">
            {currentNavItem?.label || "Dashboard"}
          </h2>
          <Logo className="text-lg lg:hidden" />
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <UserMenu />
          </div>
        </header>

        <SidebarInset className="min-h-0 flex-1">
          <ScrollArea className="h-full">
            <Outlet />
          </ScrollArea>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
