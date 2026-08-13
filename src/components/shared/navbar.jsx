import Logo from "@/components/shared/logo";
import UserMenu from "@/components/shared/user-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-is-mobile";
import useAuth, { logout as logoutAction } from "@/stores/auth";
import {
  Briefcase,
  Building2,
  Home,
  Info,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import ThemeToggle from "./theme-toggle";
const navLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/all-jobs", label: "Find Jobs", icon: Briefcase },
  { to: "/companies", label: "Companies", icon: Building2 },
  { to: "/about-us", label: "About", icon: Info },
  { to: "/contact-us", label: "Contact", icon: Mail },
];

const Navbar = () => {
  const user = useAuth((s) => s.user);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-5">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.to
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isMobile ? (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex w-80 flex-col p-0">
                <div className="flex h-16 shrink-0 items-center border-b px-6">
                  <Logo />
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto">
                  {user && (
                    <div className="flex items-center gap-3 border-b px-6 py-4">
                      <Avatar className="size-11">
                        {user.image ? (
                          <AvatarImage
                            src={user.image}
                            alt={user.name}
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <AvatarFallback className="text-sm font-semibold">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="truncate text-sm font-semibold font-heading">
                            {user.name}
                          </h4>
                        </div>
                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  )}

                  <nav className="space-y-1 p-3">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive = location.pathname === link.to;
                      return (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() => setOpen(false)}
                          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          {link.label}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                <div className="shrink-0 space-y-1 border-t p-3">
                  {user ? (
                    <>
                      <Link
                        to="/dashboard"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <LayoutDashboard className="h-4 w-4 shrink-0" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          logoutAction();
                          setOpen(false);
                        }}
                        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                      >
                        <LogOut className="h-4 w-4 shrink-0" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col gap-2 pt-1">
                      <Button variant="outline" className="w-full">
                        <Link to="/auth/login" onClick={() => setOpen(false)}>
                          Sign In
                        </Link>
                      </Button>
                      <Button className="w-full">
                        <Link
                          to="/auth/register"
                          onClick={() => setOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </Button>
                    </div>
                  )}

                  <div className="mt-2 flex items-center justify-between rounded-md px-3 py-2">
                    <span className="text-sm font-medium">Theme</span>
                    <ThemeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <>
              <ThemeToggle />
              <UserMenu />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
