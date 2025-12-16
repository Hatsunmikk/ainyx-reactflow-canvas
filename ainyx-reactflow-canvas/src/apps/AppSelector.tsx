import { useApps } from "@/hooks/useApps";
import { useUIStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";

export function AppSelector() {
  const { data, isLoading, isError } = useApps();
  const selectedAppId = useUIStore((s) => s.selectedAppId);
  const setSelectedApp = useUIStore((s) => s.setSelectedApp);

  if (isLoading) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Loading apps…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-sm text-red-500">
        Failed to load apps
      </div>
    );
  }

  return (
    <div className="p-2 space-y-1">
      {data?.map((app) => (
        <button
          key={app.id}
          onClick={() => setSelectedApp(app.id)}
          className={cn(
            "w-full rounded-md px-3 py-2 text-left text-sm transition",
            selectedAppId === app.id
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          )}
        >
          {app.name}
        </button>
      ))}
    </div>
  );
}
