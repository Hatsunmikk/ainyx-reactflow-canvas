import { Button } from "@/components/ui/button";
import { Share2, Moon } from "lucide-react";

export function TopBar() {
  return (
    <header className="flex h-12 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <div className="h-3.5 w-3.5 rounded bg-primary" />
        App Graph Builder
      </div>

      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost">
          <Moon className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
