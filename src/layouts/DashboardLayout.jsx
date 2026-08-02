import Logo from "@/components/shared/logo";
import UserMenu from "@/components/shared/user-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AnimatedThemeToggle } from "@/providers/ThemeProvider";
import useAuth, { logout as logoutAction } from "@/stores/auth";
import {
  BriefcaseBusiness,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusCircle,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";

const DashboardLayout = () => {
  const user = useAuth((s) => s.user);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const role = user?.role;

  const navItems = getNavItems(role);

  return (
    <div className="flex h-dvh overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r bg-muted/30 lg:flex">
        <div className="flex h-16 shrink-0 items-center border-b px-6">
          <Logo />
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-4 lg:hidden">
          <div className="flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex h-16 items-center border-b px-6">
                  <Logo />
                </div>
                <nav className="space-y-1 p-4">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.to;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    );
                  })}
                  <hr className="my-2" />
                  <button
                    onClick={() => {
                      logoutAction();
                      setOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
            <Logo />
          </div>
          <div className="flex items-center gap-2">
            <AnimatedThemeToggle />
            <UserMenu />
          </div>
        </header>

        {/* Desktop Top Bar */}
        <header className="hidden h-16 shrink-0 items-center justify-between border-b bg-background px-6 lg:flex">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">
              {navItems.find((n) => location.pathname === n.to)?.label ||
                "Dashboard"}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <AnimatedThemeToggle />
            <UserMenu />
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function getNavItems(role) {
  const common = [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { to: "/dashboard/profile", label: "My Profile", icon: User },
  ];

  switch (role) {
    case "ADMIN":
      return [
        ...common,
        { to: "/dashboard/manage-users", label: "Manage Users", icon: Users },
      ];
    case "RECRUITER":
      return [
        ...common,
        { to: "/dashboard/add-job", label: "Post Job", icon: PlusCircle },
        { to: "/dashboard/my-jobs", label: "My Jobs", icon: BriefcaseBusiness },
        {
          to: "/dashboard/applications",
          label: "Applications",
          icon: FileText,
        },
      ];
    case "JOB_SEEKER":
      return [
        ...common,
        {
          to: "/dashboard/applications",
          label: "My Applications",
          icon: FileText,
        },
      ];
    default:
      return common;
  }
}

export default DashboardLayout;
