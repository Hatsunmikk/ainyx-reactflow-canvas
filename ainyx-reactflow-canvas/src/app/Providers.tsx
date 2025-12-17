import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, type ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000,
    },
  },
});

type Theme = "light" | "dark";

export function Providers({ children }: { children: ReactNode }) {
  // 🌙 Set dark mode by default + restore saved preference
  useEffect(() => {
    const storedTheme =
      (localStorage.getItem("theme") as Theme | null) ?? "dark";

    document.documentElement.classList.toggle(
      "dark",
      storedTheme === "dark"
    );
  }, []);

  // 🌗 Global theme toggle (used by TopBar button)
  useEffect(() => {
    const toggleTheme = () => {
      const isDark =
        document.documentElement.classList.contains("dark");
      const next: Theme = isDark ? "light" : "dark";

      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("theme", next);
    };

    (window as Window & { __toggleTheme?: () => void }).__toggleTheme =
      toggleTheme;

    return () => {
      delete (window as Window & { __toggleTheme?: () => void }).__toggleTheme;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
