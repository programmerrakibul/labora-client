import { Toaster } from "@/components/ui/toast";
import { useTheme } from "next-themes";

const ToastProvider = () => {
  const { resolvedTheme } = useTheme();

  return <Toaster theme={resolvedTheme === "dark" ? "dark" : "light"} />;
};

export default ToastProvider;
