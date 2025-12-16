import { AppSelector } from "@/apps/AppSelector";
import { useUIStore } from "@/store/uiStore";

export function RightPanel() {
  const selectedNodeId = useUIStore((s) => s.selectedNodeId);

  return (
    <aside className="w-64 border-l flex flex-col">
      <div className="border-b">
        <h2 className="px-4 py-3 text-sm font-semibold">
          Applications
        </h2>
        <AppSelector />
      </div>

      <div className="flex-1">
        {selectedNodeId ? (
          <div className="p-4 text-sm text-muted-foreground">
            Node inspector coming next
          </div>
        ) : (
          <div className="p-4 text-sm text-muted-foreground">
            Select a node to inspect
          </div>
        )}
      </div>
    </aside>
  );
}
