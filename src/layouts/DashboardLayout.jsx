import { NavLink, Outlet,  useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import MyContainer from "../components/shared/MyContainer/MyContainer";
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineChartBar,
  HiOutlinePlusCircle,
  HiOutlineFolder,
  HiOutlineCheckCircle,
  HiOutlineHome,
  HiOutlineLogout,
  HiOutlineBriefcase,
} from "react-icons/hi";
import Avatar from "../components/shared/Avatar/Avatar";
import useAuthInfo from "../hooks/useAuthInfo";
import { getAlert } from "../utilities/getAlert";
import getAuthErrorMessage from "../utilities/getAuthErrorMessage";
import { toast } from "react-toastify";
import Logo from "../components/shared/Logo/Logo";

const sidebarItems = [
  {
    label: "Overview",
    slug: "/dashboard",
    icon: HiOutlineChartBar,
  },
  {
    label: "Add Job",
    slug: "/dashboard/add-job",
    icon: HiOutlinePlusCircle,
  },
  {
    label: "My Jobs",
    slug: "/dashboard/my-jobs",
    icon: HiOutlineFolder,
  },
  {
    label: "My Accepted Tasks",
    slug: "/dashboard/my-accepted-tasks",
    icon: HiOutlineCheckCircle,
  },
];

const DashboardLayout = () => {
  const { currentUser, logoutUser } = useAuthInfo();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const dropdownRef = useRef(null);

  // Detect mobile and handle resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);

      // Auto-close sidebar when switching to desktop
      if (!mobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen]);

  // Close dropdown or sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close mobile sidebar
      if (
        isMobile &&
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(".mobile-menu-toggle")
      ) {
        setSidebarOpen(false);
      }

      // Close user dropdown
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, sidebarOpen, dropdownOpen]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
      getAlert({
        title: "Logged out successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      const errorMessage = getAuthErrorMessage(err.code);
      toast.error(errorMessage);
    }
  };

  // Helper to close sidebar on mobile when a link is clicked
  const handleLinkClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-base-100 dark:bg-gray-900 overflow-hidden">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100 dark:bg-gray-800 shadow-sm">
        <MyContainer>
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mobile-menu-toggle lg:hidden btn btn-ghost btn-circle btn-sm"
              aria-label="Toggle menu"
              aria-expanded={sidebarOpen}
            >
              {sidebarOpen ? (
                <HiOutlineX className="size-5" />
              ) : (
                <HiOutlineMenu className="size-5" />
              )}
            </button>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <Logo />
            </div>

            {/* User Dropdown */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 btn btn-ghost btn-circle btn-sm sm:btn-md"
                  aria-label="User menu"
                  aria-expanded={dropdownOpen}
                >
                  <Avatar src={currentUser?.photoURL} alt={currentUser?.displayName} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 sm:w-64 rounded-lg shadow-lg bg-base-100 dark:bg-gray-800 border border-base-300 dark:border-gray-700 overflow-hidden z-50">
                    <div className="p-4 border-b border-base-300 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={currentUser?.photoURL}
                          alt={currentUser?.displayName}
                          size="size-10 md:size-12"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate text-base-content dark:text-white">
                            {currentUser?.displayName || "User"}
                          </p>
                          <p className="text-xs text-base-content/60 dark:text-gray-400 truncate">
                            {currentUser?.email || ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-1">
                      <NavLink
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-base-200 dark:hover:bg-gray-700 text-base-content dark:text-gray-300"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <HiOutlineHome className="size-4 shrink-0" />
                        <span>Home</span>
                      </NavLink>

                      <NavLink
                        to="/all-jobs"
                        className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-base-200 dark:hover:bg-gray-700 text-base-content dark:text-gray-300"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <HiOutlineBriefcase className="size-4 shrink-0" />
                        <span>All Jobs</span>
                      </NavLink>

                      <div className="border-t border-base-300 dark:border-gray-700 my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-base-200 dark:hover:bg-gray-700 text-error dark:text-red-400"
                      >
                        <HiOutlineLogout className="size-4 shrink-0" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </MyContainer>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          className={`${
            isMobile
              ? `fixed inset-y-0 left-0 z-30 w-72 bg-base-100 dark:bg-gray-800 border-r border-base-300 dark:border-gray-700 shadow-lg transform transition-transform duration-300 ease-in-out ${
                  sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`
              : "w-64"
          } overflow-y-auto h-full`}
          aria-label="Sidebar navigation"
        >
          <nav className="p-4 space-y-2">
            <div className="px-4 py-3 mb-4 border-b border-base-300 dark:border-gray-700">
              <p className="text-xs font-bold uppercase text-base-content/50 dark:text-gray-400">
                Menu
              </p>
            </div>

            {/* Sidebar Links */}
            {sidebarItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.slug}
                  to={item.slug}
                  end={item.slug === "/dashboard"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-base-content dark:text-gray-300 hover:bg-base-200 dark:hover:bg-gray-700"
                    }`
                  }
                  onClick={handleLinkClick} // Closes sidebar on mobile after navigation
                >
                  <Icon className="size-5 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}

            {/* Sidebar Footer */}
            <div className="mt-8 pt-4 border-t border-base-300 dark:border-gray-700">
              <div className="px-4 py-3 text-center text-xs text-base-content/50 dark:text-gray-400">
                <p>Labora Dashboard</p>
                <p className="mt-1 opacity-70">v1.0</p>
              </div>
            </div>
          </nav>
        </aside>

        {/* Optional: Backdrop for mobile */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-linear-to-br from-base-50 to-base-100 dark:from-gray-900 dark:to-gray-800">
          <div className="h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;