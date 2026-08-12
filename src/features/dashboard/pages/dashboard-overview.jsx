import useAuth from "@/stores/auth";
import Container from "@/components/shared/container";
import Seo from "@/components/shared/seo";
import AdminDashboard from "../components/admin-dashboard";
import RecruiterDashboard from "../components/recruiter-dashboard";
import JobSeekerDashboard from "../components/job-seeker-dashboard";

const DashboardOverview = () => {
  const user = useAuth((s) => s.user);
  const role = user?.role;

  return (
    <Container className="py-8">
      <Seo title="Dashboard" noindex />
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name || "User"}</p>
      </div>

      {role === "ADMIN" && <AdminDashboard />}
      {(role === "COMPANY_OWNER" || role === "COMPANY_MEMBER") && (
        <RecruiterDashboard />
      )}
      {role === "JOB_SEEKER" && <JobSeekerDashboard />}
    </Container>
  );
};

export default DashboardOverview;
