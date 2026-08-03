import router from "@/app/router";
import ProviderWrapper from "@/providers/provider-wrapper";
import { fetchSession } from "@/stores/auth";
import { useEffect } from "react";
import { RouterProvider } from "react-router";

const App = () => {
  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <ProviderWrapper>
      <RouterProvider router={router} />
    </ProviderWrapper>
  );
};

export default App;
