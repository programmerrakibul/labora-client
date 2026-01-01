import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Homepage from "../pages/Homepage/Homepage";
import AddJobPage from "../pages/AddJobPage/AddJobPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";
import AllJobsPage from "../pages/AllJobsPage/AllJobsPage";
import JobDetailsPage from "../pages/JobDetailsPage/JobDetailsPage";
import MyJobsPage from "../pages/MyJobsPage/MyJobsPage";
import UpdateJobDetails from "../pages/UpdateJobDetails/UpdateJobDetails";
import MyAcceptedTasksPage from "../pages/MyAcceptedTasksPage/MyAcceptedTasksPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AboutUs from "../pages/AboutUs/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "job-details/:id",
        element: <JobDetailsPage />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
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
            path: "my-added-jobs",
            element: <MyJobsPage />,
          },
          {
            path: "update-job-details/:id",
            element: <UpdateJobDetails />,
          },
          {
            path: "my-accepted-tasks",
            element: <MyAcceptedTasksPage />,
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
