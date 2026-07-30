import { createBrowserRouter } from "react-router";
import RootLayout from "@/layouts/RootLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import PrivateRoute from "@/features/auth/components/private-route";
import RoleGuard from "@/features/auth/components/role-guard";
import ErrorPage from "@/features/public/pages/error-page";

// Public pages
import Homepage from "@/features/public/pages/homepage";
import AboutPage from "@/features/public/pages/about-page";
import ContactPage from "@/features/public/pages/contact-page";
import AllJobsPage from "@/features/jobs/pages/all-jobs-page";
import JobDetailsPage from "@/features/jobs/pages/job-details-page";

// Auth pages
import LoginPage from "@/features/auth/pages/login-page";
import RegisterPage from "@/features/auth/pages/register-page";

// Dashboard pages
import DashboardOverview from "@/features/dashboard/pages/dashboard-overview";
import AddJobPage from "@/features/jobs/pages/add-job-page";
import UpdateJobPage from "@/features/jobs/pages/update-job-page";
import MyJobsPage from "@/features/jobs/pages/my-jobs-page";
import ApplicationsPage from "@/features/applications/pages/applications-page";
import ManageUsersPage from "@/features/users/pages/manage-users-page";
import ProfilePage from "@/features/users/pages/profile-page";
import EditProfilePage from "@/features/users/pages/edit-profile-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
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
          <RoleGuard allowedRoles={["RECRUITER"]}>
            <AddJobPage />
          </RoleGuard>
        ),
      },
      {
        path: "my-jobs",
        element: (
          <RoleGuard allowedRoles={["RECRUITER"]}>
            <MyJobsPage />
          </RoleGuard>
        ),
      },
      {
        path: "my-jobs/update/:id",
        element: (
          <RoleGuard allowedRoles={["RECRUITER"]}>
            <UpdateJobPage />
          </RoleGuard>
        ),
      },
      {
        path: "applications",
        element: (
          <RoleGuard allowedRoles={["RECRUITER", "JOB_SEEKER"]}>
            <ApplicationsPage />
          </RoleGuard>
        ),
      },
      {
        path: "manage-users",
        element: (
          <RoleGuard allowedRoles={["ADMIN"]}>
            <ManageUsersPage />
          </RoleGuard>
        ),
      },
      { path: "profile", element: <ProfilePage /> },
      { path: "update-profile", element: <EditProfilePage /> },
    ],
  },
]);

export default router;
