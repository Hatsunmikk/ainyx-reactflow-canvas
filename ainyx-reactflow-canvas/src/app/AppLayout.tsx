import type { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { LeftRail } from "./LeftRail";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-background">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        <LeftRail />

        <main className="flex-1 bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  );
}
