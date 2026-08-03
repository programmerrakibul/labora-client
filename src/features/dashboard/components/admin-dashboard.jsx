import { BriefcaseBusiness, FileText, TrendingUp, Users } from "lucide-react";
import { useAdminStats } from "../hooks/use-dashboard";
import { toChartData } from "../utils/to-chart-data";
import DashboardLoading from "./dashboard-loading";
import StatsGrid from "./stats-grid";
import StatusBarChart from "./status-bar-chart";
import UsersByRoleChart from "./users-by-role-chart";

const AdminDashboard = () => {
  const { data, isLoading } = useAdminStats();

  if (isLoading) {
    return <DashboardLoading />;
  }

  const stats = data?.data;
  if (!stats) return null;

  const overview = [
    { title: "Total Users", value: stats.overview?.totalUsers, icon: Users },
    {
      title: "Total Jobs",
      value: stats.overview?.totalJobs,
      icon: BriefcaseBusiness,
    },
    {
      title: "Total Applications",
      value: stats.overview?.totalApplications,
      icon: FileText,
    },
    {
      title: "New Users (30d)",
      value: stats.last30Days?.newUsers,
      icon: TrendingUp,
    },
  ];

  const jobsByStatus = toChartData(stats.breakdown?.jobsByStatus);
  const usersByRole = toChartData(stats.breakdown?.usersByRole);

  return (
    <div className="space-y-6">
      <StatsGrid stats={overview} />

      <div className="grid gap-6 lg:grid-cols-2">
        {jobsByStatus.length > 0 && (
          <StatusBarChart title="Jobs by Status" data={jobsByStatus} />
        )}
        {usersByRole.length > 0 && (
          <UsersByRoleChart title="Users by Role" data={usersByRole} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
