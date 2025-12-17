import { Button } from "@/components/ui/button";
import { Share2, Moon, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUIStore } from "@/store/uiStore";

export function TopBar() {
  const requestAddNode = useUIStore((s) => s.requestAddNode);

  return (
    <header className="flex h-12 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <div className="h-3.5 w-3.5 rounded bg-primary" />
        App Graph Builder
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
              <Plus className="mr-1 h-4 w-4" />
              Add Node
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => requestAddNode("service")}>
              Service
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => requestAddNode("database")}>
              Database
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
