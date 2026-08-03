import { FileText, TrendingUp } from "lucide-react";
import { useJobSeekerStats } from "../hooks/use-dashboard";
import { toChartData } from "../utils/to-chart-data";
import DashboardLoading from "./dashboard-loading";
import StatsGrid from "./stats-grid";
import StatusBarChart from "./status-bar-chart";

const JobSeekerDashboard = () => {
  const { data, isLoading } = useJobSeekerStats();

  if (isLoading) {
    return <DashboardLoading cards={2} charts={1} />;
  }

  const stats = data?.data;
  if (!stats) return null;

  const overview = [
    {
      title: "Total Applications",
      value: stats.overview?.totalApplications,
      icon: FileText,
    },
    {
      title: "New Applications (30d)",
      value: stats.last30Days?.newApplications,
      icon: TrendingUp,
    },
  ];

  const appsByStatus = toChartData(stats.breakdown?.applicationsByStatus);

  return (
    <div className="space-y-6">
      <StatsGrid stats={overview} />

      {appsByStatus.length > 0 && (
        <StatusBarChart
          title="Your Applications by Status"
          data={appsByStatus}
        />
      )}
    </div>
  );
};

export default JobSeekerDashboard;
