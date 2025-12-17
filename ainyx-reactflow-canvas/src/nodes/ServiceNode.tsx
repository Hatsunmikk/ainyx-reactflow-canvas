import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Badge } from "@/components/ui/badge";
import type { ServiceNodeData } from "@/types/node";

export function ServiceNode(props: NodeProps) {
  const data = props.data as ServiceNodeData;
  const selected = props.selected;

  return (
    <div
      className={[
        "min-w-40 rounded-lg border bg-background px-3 py-2.5",
        "shadow-sm transition-shadow",
        selected
          ? "border-primary shadow-md ring-1 ring-primary/40"
          : "border-border",
      ].join(" ")}
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <div className="truncate text-sm font-medium leading-tight">
          {data.label}
        </div>

        <Badge
          variant={
            data.status === "Down"
              ? "destructive"
              : data.status === "Degraded"
              ? "secondary"
              : "default"
          }
          className="h-5 px-1.5 text-[10px] font-medium"
        >
          {data.status}
        </Badge>
      </div>

      <div className="text-xs text-muted-foreground">
        Service
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
