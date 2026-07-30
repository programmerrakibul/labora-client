import router from "@/app/router";
import QueryProvider from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { fetchSession } from "@/stores/auth";
import { useEffect } from "react";
import { RouterProvider } from "react-router";

const App = () => {
  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <QueryProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryProvider>
  );
};

export default App;
