export type ServiceStatus = "Healthy" | "Degraded" | "Down";

export interface ServiceNodeData extends Record<string, unknown> {
  label: string;
  description?: string;
  status: ServiceStatus;
  load: number;
}
