import Container from "@/components/shared/container";
import Seo from "@/components/shared/seo";
import { USER_ROLE } from "@/constants/enums";
import useAuth from "@/stores/auth";
import AdminDashboard from "../components/admin-dashboard";
import JobSeekerDashboard from "../components/job-seeker-dashboard";
import RecruiterDashboard from "../components/recruiter-dashboard";

const DashboardOverview = () => {
  const user = useAuth((s) => s.user);
  const role = user?.role;
  const ADMIN = role === USER_ROLE.ADMIN;
  const RECRUITER = [USER_ROLE.COMPANY_OWNER, USER_ROLE.COMPANY_MEMBER];

  return (
    <Container className="py-8">
      <Seo title="Dashboard" noindex />
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name || "User"}
        </p>
      </div>

      {ADMIN && <AdminDashboard />}
      {RECRUITER.includes(role) && <RecruiterDashboard />}
      {role === USER_ROLE.JOB_SEEKER && <JobSeekerDashboard />}
    </Container>
  );
};

export default DashboardOverview;
