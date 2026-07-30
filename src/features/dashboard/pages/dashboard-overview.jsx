import { useAdminStats, useRecruiterStats, useJobSeekerStats } from "../hooks/use-dashboard";
import useAuth from "@/stores/auth";
import Container from "@/components/shared/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { BriefcaseBusiness, Users, FileText, TrendingUp } from "lucide-react";

const COLORS = ["#6366f1", "#f97316", "#10b981", "#ef4444", "#8b5cf6", "#06b6d4"];

const StatCard = ({ title, value, icon, description }) => {
  const IconComponent = icon;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <IconComponent className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value?.toLocaleString() ?? 0}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  );
};

const DashboardOverview = () => {
  const user = useAuth((s) => s.user);
  const role = user?.role;

  return (
    <Container className="py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name || "User"}
        </p>
      </div>

      {role === "ADMIN" && <AdminDashboard />}
      {role === "RECRUITER" && <RecruiterDashboard />}
      {role === "JOB_SEEKER" && <JobSeekerDashboard />}
    </Container>
  );
};

const AdminDashboard = () => {
  const { data, isLoading } = useAdminStats();

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-32 rounded-lg bg-muted" />)}
      </div>
    </div>;
  }

  const stats = data?.data;
  if (!stats) return null;

  const overview = [
    { title: "Total Users", value: stats.overview?.totalUsers, icon: Users },
    { title: "Total Jobs", value: stats.overview?.totalJobs, icon: BriefcaseBusiness },
    { title: "Total Applications", value: stats.overview?.totalApplications, icon: FileText },
    { title: "New Users (30d)", value: stats.last30Days?.newUsers, icon: TrendingUp },
  ];

  const jobsByStatus = stats.breakdown?.jobsByStatus
    ? Object.entries(stats.breakdown.jobsByStatus).map(([name, value]) => ({ name, value }))
    : [];

  const usersByRole = stats.breakdown?.usersByRole
    ? Object.entries(stats.breakdown.usersByRole).map(([name, value]) => ({ name, value }))
    : [];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {overview.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {jobsByStatus.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Jobs by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={jobsByStatus}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {usersByRole.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Users by Role</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={usersByRole} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {usersByRole.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

const RecruiterDashboard = () => {
  const { data, isLoading } = useRecruiterStats();

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-32 rounded-lg bg-muted" />)}
      </div>
    </div>;
  }

  const stats = data?.data;
  if (!stats) return null;

  const overview = [
    { title: "Jobs Posted", value: stats.overview?.totalJobsPosted, icon: BriefcaseBusiness },
    { title: "Applications Received", value: stats.overview?.totalApplicationsReceived, icon: FileText },
    { title: "New Jobs (30d)", value: stats.last30Days?.newJobsPosted, icon: TrendingUp },
    { title: "New Applications (30d)", value: stats.last30Days?.newApplicationsReceived, icon: Users },
  ];

  const jobsByStatus = stats.breakdown?.jobsByStatus
    ? Object.entries(stats.breakdown.jobsByStatus).map(([name, value]) => ({ name, value }))
    : [];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {overview.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {jobsByStatus.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your Jobs by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={jobsByStatus}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const JobSeekerDashboard = () => {
  const { data, isLoading } = useJobSeekerStats();

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 2 }).map((_, i) => <div key={i} className="h-32 rounded-lg bg-muted" />)}
      </div>
    </div>;
  }

  const stats = data?.data;
  if (!stats) return null;

  const overview = [
    { title: "Total Applications", value: stats.overview?.totalApplications, icon: FileText },
    { title: "New Applications (30d)", value: stats.last30Days?.newApplications, icon: TrendingUp },
  ];

  const appsByStatus = stats.breakdown?.applicationsByStatus
    ? Object.entries(stats.breakdown.applicationsByStatus).map(([name, value]) => ({ name, value }))
    : [];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {overview.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {appsByStatus.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your Applications by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={appsByStatus}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardOverview;
