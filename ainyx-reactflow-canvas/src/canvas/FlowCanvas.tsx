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

  const [nodes, setNodes, onNodesChange] = useNodesState<Node<ServiceNodeData>>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    if (data) {
      setNodes(data.nodes);
      setEdges(data.edges);
    }
  }, [data, setNodes, setEdges]);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const updateNodeData = (patch: Partial<Node["data"]>) => {
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
