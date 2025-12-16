import type { AppGraph, AppSummary } from "@/types/graph";
import type { Node, Edge } from "@xyflow/react";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const mockApps: AppSummary[] = [
  { id: "app-1", name: "Payments Service" },
  { id: "app-2", name: "Notifications Service" },
];

const graphByAppId: Record<string, AppGraph> = {
  "app-1": {
    nodes: [
      {
        id: "svc-1",
        position: { x: 100, y: 100 },
        data: { label: "API Gateway", status: "Healthy", load: 40 },
      },
      {
        id: "svc-2",
        position: { x: 300, y: 200 },
        data: { label: "Payments", status: "Degraded", load: 70 },
      },
      {
        id: "svc-3",
        position: { x: 500, y: 100 },
        data: { label: "DB", status: "Healthy", load: 30 },
      },
    ] as Node[],
    edges: [
      { id: "e1-2", source: "svc-1", target: "svc-2" },
      { id: "e2-3", source: "svc-2", target: "svc-3" },
    ] as Edge[],
  },
  "app-2": {
    nodes: [
      {
        id: "svc-a",
        position: { x: 200, y: 150 },
        data: { label: "Worker", status: "Down", load: 90 },
      },
      {
        id: "svc-b",
        position: { x: 400, y: 250 },
        data: { label: "Queue", status: "Healthy", load: 20 },
      },
      {
        id: "svc-c",
        position: { x: 600, y: 150 },
        data: { label: "DB", status: "Healthy", load: 35 },
      },
    ] as Node[],
    edges: [
      { id: "ea-b", source: "svc-a", target: "svc-b" },
      { id: "eb-c", source: "svc-b", target: "svc-c" },
    ] as Edge[],
  },
};

export async function fetchApps(): Promise<AppSummary[]> {
  await delay(600);
  return mockApps;
}

export async function fetchAppGraph(appId: string): Promise<AppGraph> {
  await delay(800);

  if (!graphByAppId[appId]) {
    throw new Error("App not found");
  }

  return graphByAppId[appId];
}
