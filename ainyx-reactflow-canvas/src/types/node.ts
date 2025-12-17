export type NodeKind = "service" | "database";

export type ServiceStatus = "Healthy" | "Degraded" | "Down";

export interface ServiceNodeData extends Record<string, unknown> {
  type: NodeKind;
  label: string;
  description?: string;
  status: ServiceStatus;
  load: number;
}
