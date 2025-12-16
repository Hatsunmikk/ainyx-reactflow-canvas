import type { Node, Edge } from "@xyflow/react";

export interface AppSummary {
  id: string;
  name: string;
}

export interface AppGraph {
  nodes: Node[];
  edges: Edge[];
}
