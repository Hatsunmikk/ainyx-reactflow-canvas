import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000,
    },
  },
});

export function Providers({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Set dark mode by default (and restore saved preference)
  useEffect(() => {
    const storedTheme =
      (localStorage.getItem("theme") as "light" | "dark" | null) ??
      "dark";

    setTheme(storedTheme);
    document.documentElement.classList.toggle(
      "dark",
      storedTheme === "dark"
    );
  }, []);

  // Expose a simple global toggle (clean + effective)
  useEffect(() => {
    (window as any).__toggleTheme = () => {
      setTheme((prev) => {
        const next = prev === "dark" ? "light" : "dark";
        localStorage.setItem("theme", next);
        document.documentElement.classList.toggle(
          "dark",
          next === "dark"
        );
        return next;
      });
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
