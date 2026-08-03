import Logo from "@/components/shared/logo";
import UserMenu from "@/components/shared/user-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useAuth, { logout as logoutAction } from "@/stores/auth";
import { LayoutDashboard, LogOut, Menu, User } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import ThemeToggle from "./theme-toggle";
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/all-jobs", label: "Find Jobs" },
  { to: "/about-us", label: "About" },
  { to: "/contact-us", label: "Contact" },
];

const Navbar = () => {
  const user = useAuth((s) => s.user);
  const location = useLocation();
  const [open, setOpen] = useState(false);

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
          <ThemeToggle />
          <UserMenu />

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-4 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`text-sm font-medium ${
                      location.pathname === link.to
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr />
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <User className="h-4 w-4" /> Profile
                    </Link>
                    <button
                      onClick={() => {
                        logoutAction();
                        setOpen(false);
                      }}
                      className="flex items-center gap-2 text-sm font-medium text-destructive"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button variant="outline">
                      <Link to="/auth/login" onClick={() => setOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button>
                      <Link to="/auth/register" onClick={() => setOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
