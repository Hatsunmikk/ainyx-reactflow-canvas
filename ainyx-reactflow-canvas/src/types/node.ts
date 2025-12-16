export type ServiceStatus = "Healthy" | "Degraded" | "Down";

export interface ServiceNodeData {
  label: string;
  description?: string;
  status: ServiceStatus;
  load: number;
}
