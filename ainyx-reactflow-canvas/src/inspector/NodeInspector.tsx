import { useMemo } from "react";
import { useUIStore } from "@/store/uiStore";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import type { Node } from "@xyflow/react";

interface Props {
  node: Node;
  onUpdate: (data: Partial<Node["data"]>) => void;
}

export function NodeInspector({ node, onUpdate }: Props) {
  const activeTab = useUIStore((s) => s.activeInspectorTab);
  const setTab = useUIStore((s) => s.setInspectorTab);

  const status = node.data?.status ?? "Healthy";
  const load = node.data?.load ?? 0;

  const statusColor = useMemo(() => {
    switch (status) {
      case "Down":
        return "destructive";
      case "Degraded":
        return "secondary";
      default:
        return "default";
    }
  }, [status]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Service Node</h3>
        <Badge variant={statusColor}>{status}</Badge>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setTab(v as any)}>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="runtime">Runtime</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-4">
          <Input
            value={node.data?.label ?? ""}
            onChange={(e) => onUpdate({ label: e.target.value })}
            placeholder="Service name"
          />

          <Textarea
            placeholder="Description"
            value={node.data?.description ?? ""}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            onUpdate({ description: e.target.value })
            }

          />

          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">
              Load
            </label>
            <div className="flex gap-2 items-center">
              <Slider
                value={[load]}
                min={0}
                max={100}
                step={1}
                onValueChange={([v]: number[]) => onUpdate({ load: v })}
                className="flex-1"
              />
              <Input
                type="number"
                value={load}
                min={0}
                max={100}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                 onUpdate({ label: e.target.value })
                }
                className="w-20"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="runtime">
          <div className="text-sm text-muted-foreground">
            Runtime metrics coming soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
