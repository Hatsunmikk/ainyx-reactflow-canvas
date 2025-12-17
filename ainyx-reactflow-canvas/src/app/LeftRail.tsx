import {
  LayoutGrid,
  Database,
  Settings,
  Boxes,
} from "lucide-react";

const icons = [
  { icon: LayoutGrid, label: "Apps" },
  { icon: Boxes, label: "Services" },
  { icon: Database, label: "Databases" },
  { icon: Settings, label: "Settings" },
];

export function LeftRail() {
  return (
    <aside className="flex w-12 flex-col items-center gap-4 border-r bg-background py-4">
      {icons.map(({ icon: Icon, label }) => (
        <button
          key={label}
          aria-label={label}
          title={label}
          className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition"
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </aside>
  );
}
