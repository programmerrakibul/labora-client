import { BriefcaseBusiness, FileText, TrendingUp, Users } from "lucide-react";
import { useRecruiterStats } from "../hooks/use-dashboard";
import { toChartData } from "../utils/to-chart-data";
import DashboardLoading from "./dashboard-loading";
import StatsGrid from "./stats-grid";
import StatusBarChart from "./status-bar-chart";

const RecruiterDashboard = () => {
  const { data, isLoading } = useRecruiterStats();

  if (isLoading) {
    return <DashboardLoading charts={1} />;
  }

  const stats = data?.data;
  if (!stats) return null;

  const overview = [
    {
      title: "Jobs Posted",
      value: stats.overview?.totalJobsPosted,
      icon: BriefcaseBusiness,
    },
    {
      title: "Applications Received",
      value: stats.overview?.totalApplicationsReceived,
      icon: FileText,
    },
    {
      title: "New Jobs (30d)",
      value: stats.last30Days?.newJobsPosted,
      icon: TrendingUp,
    },
    {
      title: "New Applications (30d)",
      value: stats.last30Days?.newApplicationsReceived,
      icon: Users,
    },
  ];

  const jobsByStatus = toChartData(stats.breakdown?.jobsByStatus);

  return (
    <div className="space-y-6">
      <StatsGrid stats={overview} />

      {jobsByStatus.length > 0 && (
        <StatusBarChart title="Your Jobs by Status" data={jobsByStatus} />
      )}
    </div>
  );
};

export default RecruiterDashboard;
