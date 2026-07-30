import { useTheme } from "next-themes";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export const AnimatedThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <AnimatedThemeToggler
      className="h-9 w-9"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onThemeChange={setTheme}
      variant="circle"
      duration={400}
    />
  );
};
