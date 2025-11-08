import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Homepage from "../pages/Homepage/Homepage";
import AddJobPage from "../pages/AddJobPage/AddJobPage";

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
    ],
  },
]);

export default router;
