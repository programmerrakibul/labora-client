import { USER_ROLE } from "@/constants/enums";
import {
  BriefcaseBusiness,
  Building2,
  FileText,
  LayoutDashboard,
  PlusCircle,
  User,
  Users,
} from "lucide-react";

export function getNavItems(role) {
  const common = [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { to: "/dashboard/profile", label: "My Profile", icon: User },
  ];

  switch (role) {
    case USER_ROLE.ADMIN:
      return [
        ...common,
        { to: "/dashboard/manage-users", label: "Manage Users", icon: Users },
        { to: "/dashboard/companies", label: "Companies", icon: Building2 },
      ];
    case USER_ROLE.COMPANY_OWNER:
    case USER_ROLE.COMPANY_MEMBER:
      return [
        ...common,
        { to: "/dashboard/add-job", label: "Post Job", icon: PlusCircle },
        { to: "/dashboard/my-jobs", label: "My Jobs", icon: BriefcaseBusiness },
        {
          to: "/dashboard/applications",
          label: "Applications",
          icon: FileText,
        },
        { to: "/dashboard/company", label: "My Company", icon: Building2 },
      ];
    case USER_ROLE.JOB_SEEKER:
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
