import { useEffect, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import type { Node, Edge } from "@xyflow/react";

import { useUIStore } from "@/store/uiStore";
import { useGraph } from "@/hooks/useGraph";
import { NodeInspector } from "@/inspector/NodeInspector";
import type { ServiceNodeData } from "@/types/node";

export function FlowCanvas() {
  const selectedAppId = useUIStore((s) => s.selectedAppId);
  const selectedNodeId = useUIStore((s) => s.selectedNodeId);
  const setSelectedNode = useUIStore((s) => s.setSelectedNode);

  const { data, isLoading, isError } = useGraph(selectedAppId);

  // ✅ Typed ReactFlow state
  const [nodes, setNodes, onNodesChange] =
    useNodesState<Node<ServiceNodeData>>([]);
  const [edges, setEdges, onEdgesChange] =
    useEdgesState<Edge>([]);

  // ✅ Normalize incoming graph data (VERY important)
  useEffect(() => {
  if (!data) return;

  const typedNodes: Node<ServiceNodeData>[] = data.nodes.map((n) => {
    const raw = n.data as Partial<ServiceNodeData>;

    return {
      ...n,
      data: {
        label: typeof raw.label === "string" ? raw.label : "Service",
        description:
          typeof raw.description === "string" ? raw.description : "",
        status:
          raw.status === "Healthy" ||
          raw.status === "Degraded" ||
          raw.status === "Down"
            ? raw.status
            : "Healthy",
        load: typeof raw.load === "number" ? raw.load : 0,
      },
    };
  });

  setNodes(typedNodes);
  setEdges(data.edges);
}, [data, setNodes, setEdges]);


  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  // ✅ Inspector → canvas data updates
  const updateNodeData = (patch: Partial<ServiceNodeData>) => {
    if (!selectedNodeId) return;

    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNodeId
          ? { ...n, data: { ...n.data, ...patch } }
          : n
      )
    );
  };

  const onNodeClick = useCallback(
    (_: unknown, node: Node<ServiceNodeData>) => {
      setSelectedNode(node.id);
    },
    [setSelectedNode]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  if (!selectedAppId) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Select an app to view its graph
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        Loading graph…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center text-red-500">
        Failed to load graph
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={16}
          size={1}
        />
        <Controls />
      </ReactFlow>

      {selectedNode && (
        <div className="absolute right-0 top-0 h-full w-64 border-l bg-background">
          <NodeInspector
            node={selectedNode}
            onUpdate={updateNodeData}
          />
        </div>
      )}
    </div>
  );
}
