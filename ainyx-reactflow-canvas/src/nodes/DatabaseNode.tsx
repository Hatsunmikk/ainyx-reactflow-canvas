import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Database } from "lucide-react";
import type { ServiceNodeData } from "@/types/node";

export function DatabaseNode(props: NodeProps) {
  const data = props.data as ServiceNodeData;
  const selected = props.selected;

  return (
    <div
      className={[
        "min-w-40 rounded-xl border bg-muted px-4 py-3",
        "shadow-sm transition-shadow",
        selected
          ? "border-purple-500 shadow-md ring-1 ring-purple-500/40"
          : "border-border",
      ].join(" ")}
    >
      <div className="flex items-center gap-2">
        <Database className="h-4 w-4 text-purple-500 shrink-0" />
        <div className="truncate text-sm font-medium leading-tight">
          {data.label}
        </div>
      </div>

      <div className="mt-1 text-xs text-muted-foreground">
        Database
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="bg-muted-foreground!"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="bg-muted-foreground!"
      />
    </div>
  );
}
