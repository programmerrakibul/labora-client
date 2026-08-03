import { fetchSession } from "@/stores/auth";
import { useEffect } from "react";
import QueryProvider from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import ToastProvider from "./toast-provider";

const ProviderWrapper = ({ children }) => {
  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <QueryProvider>
      <ThemeProvider>
        {children}
        <ToastProvider />
      </ThemeProvider>
    </QueryProvider>
  );
};

export default ProviderWrapper;
