import { useEffect, useCallback } from "react";
import  { 
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import type {Node, Edge } from "@xyflow/react";
import { BackgroundVariant } from "@xyflow/react";
import { useUIStore } from "@/store/uiStore";
import { useGraph } from "@/hooks/useGraph";

export function FlowCanvas() {
  const selectedAppId = useUIStore((s) => s.selectedAppId);
  const setSelectedNode = useUIStore((s) => s.setSelectedNode);

  const { data, isLoading, isError } = useGraph(selectedAppId);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // Sync fetched graph into ReactFlow state
  useEffect(() => {
    if (data) {
      setNodes(data.nodes);
      setEdges(data.edges);
    }
  }, [data, setNodes, setEdges]);

  const onNodeClick = useCallback(
    (_: unknown, node: Node) => {
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
      size={1} />
      <Controls />
    </ReactFlow>
  );
}
