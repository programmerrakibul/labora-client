import PrivateRoute from "@/features/auth/components/private-route";
import RoleGuard from "@/features/auth/components/role-guard";
import ErrorPage from "@/features/public/pages/error-page";
import DashboardLayout from "@/layouts/DashboardLayout";
import RootLayout from "@/layouts/RootLayout";
import { createBrowserRouter } from "react-router";

// Public pages
import CompaniesPage from "@/features/companies/pages/companies-page";
import AllJobsPage from "@/features/jobs/pages/all-jobs-page";
import JobDetailsPage from "@/features/jobs/pages/job-details-page";
import AboutPage from "@/features/public/pages/about-page";
import ContactPage from "@/features/public/pages/contact-page";
import Homepage from "@/features/public/pages/homepage";

// Auth pages
import LoginPage from "@/features/auth/pages/login-page";
import RegisterPage from "@/features/auth/pages/register-page";

// Dashboard pages
import { USER_ROLE } from "@/constants/enums";
import ApplicationsPage from "@/features/applications/pages/applications-page";
import ManageCompaniesPage from "@/features/companies/pages/manage-companies-page";
import MyCompanyPage from "@/features/companies/pages/my-company-page";
import DashboardOverview from "@/features/dashboard/pages/dashboard-overview";
import AddJobPage from "@/features/jobs/pages/add-job-page";
import MyJobsPage from "@/features/jobs/pages/my-jobs-page";
import ManageUsersPage from "@/features/users/pages/manage-users-page";
import ProfilePage from "@/features/users/pages/profile-page";

const RECRUITER = [USER_ROLE.COMPANY_OWNER, USER_ROLE.COMPANY_MEMBER];

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "companies", element: <CompaniesPage /> },
      { path: "about-us", element: <AboutPage /> },
      { path: "contact-us", element: <ContactPage /> },
      { path: "all-jobs", element: <AllJobsPage /> },
      { path: "job-details/:id", element: <JobDetailsPage /> },
      { path: "auth/login", element: <LoginPage /> },
      { path: "auth/register", element: <RegisterPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardOverview /> },
      {
        path: "add-job",
        element: (
          <RoleGuard allowedRoles={RECRUITER}>
            <AddJobPage />
          </RoleGuard>
        ),
      },
      {
        path: "my-jobs",
        element: (
          <RoleGuard allowedRoles={RECRUITER}>
            <MyJobsPage />
          </RoleGuard>
        ),
      },
      {
        path: "applications",
        element: (
          <RoleGuard allowedRoles={[USER_ROLE.JOB_SEEKER, ...RECRUITER]}>
            <ApplicationsPage />
          </RoleGuard>
        ),
      },
      {
        path: "company",
        element: (
          <RoleGuard allowedRoles={RECRUITER}>
            <MyCompanyPage />
          </RoleGuard>
        ),
      },
      {
        path: "manage-users",
        element: (
          <RoleGuard allowedRoles={[USER_ROLE.ADMIN]}>
            <ManageUsersPage />
          </RoleGuard>
        ),
      },
      {
        path: "companies",
        element: (
          <RoleGuard allowedRoles={[USER_ROLE.ADMIN]}>
            <ManageCompaniesPage />
          </RoleGuard>
        ),
      },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);

export default router;
