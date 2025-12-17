import {
  LayoutGrid,
  Database,
  Settings,
  Boxes,
} from "lucide-react";

const icons = [
  LayoutGrid,
  Boxes,
  Database,
  Settings,
];

export function LeftRail() {
  return (
    <aside className="flex w-12 flex-col items-center gap-4 border-r bg-background py-4">
      {icons.map((Icon, i) => (
        <button
          key={i}
          className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </aside>
  );
}
