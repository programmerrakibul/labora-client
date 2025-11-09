import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Homepage from "../pages/Homepage/Homepage";
import AddJobPage from "../pages/AddJobPage/AddJobPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

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
        path: "add-job",
        element: <AddJobPage />,
      },
      {
        path: "auth/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
