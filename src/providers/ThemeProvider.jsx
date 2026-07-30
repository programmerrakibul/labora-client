import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AnimatedThemeToggle } from "@/components/shared/animated-theme-toggle";

export const ThemeProvider = ({ children }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
};

export { AnimatedThemeToggle };
