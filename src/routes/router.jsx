import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Homepage from "../pages/Homepage/Homepage";
import AddJobPage from "../pages/AddJobPage/AddJobPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";
import AllJobsPage from "../pages/AllJobsPage/AllJobsPage";
import JobDetailsPage from "../pages/JobDetailsPage/JobDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "",
        element: <PrivateRoute />,
        children: [
          {
            path: "add-job",
            element: <AddJobPage />,
          },
          {
            path: "job-details/:id",
            element: <JobDetailsPage />,
          },
        ],
      },
      {
        path: "all-jobs",
        element: <AllJobsPage />,
      },
      {
        path: "auth/register",
        element: <RegisterPage />,
      },
      {
        path: "auth/login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
