import { TopBar } from "./TopBar";
import { LeftRail } from "./LeftRail";

export function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftRail />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
