import { ChevronDown, Home, LayoutDashboard, LogOut } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import useAuth, { logout as logoutAction } from "@/stores/auth";
import { UserIcon } from "lucide-react";

const UserMenu = () => {
  const user = useAuth((s) => s.user);
  const isLoading = useAuth((s) => s.loading);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const to = encodeURIComponent(`${pathname}?${searchParams.toString()}`);

  const inDashboard = pathname.startsWith("/dashboard");
  const initials = user?.name?.charAt(0)?.toUpperCase() || "U";

  if (isLoading) {
    return <Spinner className="size-5" />;
  }

  if (!user) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="size-9"
        aria-label="Sign in"
        onClick={() =>
          navigate(`/auth/login?to=${to}`, {
            replace: true,
          })
        }
      >
        <UserIcon className="size-5" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-1.5 rounded-full p-0.5 transition-colors hover:bg-muted"
        aria-label="Account menu"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="size-8 rounded-full object-cover"
          />
        ) : (
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {initials}
          </div>
        )}
        <ChevronDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <div className="px-2 py-1.5">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigate(inDashboard ? "/" : "/dashboard")}
        >
          {inDashboard ? (
            <Home className="size-4" />
          ) : (
            <LayoutDashboard className="size-4" />
          )}
          {inDashboard ? "Home" : "Dashboard"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() =>
            logoutAction({
              navigate,
              searchParams,
              pathname,
            })
          }
        >
          <LogOut className="size-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
