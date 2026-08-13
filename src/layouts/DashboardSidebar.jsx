import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import useAuth, { logout as logoutAction } from "@/stores/auth";
import { LogOut, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { getNavItems } from "./dashboard-nav";

const DashboardSidebar = () => {
  const user = useAuth((s) => s.user);
  const { pathname } = useLocation();
  const { setOpenMobile } = useSidebar();

  const navItems = getNavItems(user?.role);

  const handleLogout = async () => {
    setOpenMobile(false);
    await logoutAction();
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex justify-between h-12 items-center px-2 group-data-[collapsible=icon]:justify-center">
          <Logo className="group-data-[collapsible=icon]:hidden" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpenMobile(false)}
            className="group-data-[collapsible=icon]:hidden md:hidden"
          >
            <X />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.to;
                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      render={<Link to={item.to} />}
                      isActive={isActive}
                      tooltip={item.label}
                      onClick={() => setOpenMobile(false)}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={
                <Button
                  variant="destructive"
                  type="button"
                  onClick={handleLogout}
                />
              }
              tooltip="Sign Out"
            >
              <LogOut />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export default DashboardSidebar;
