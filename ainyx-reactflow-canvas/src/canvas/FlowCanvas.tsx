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

  const nodeToAdd = useUIStore((s) => s.nodeToAdd);
  const clearNodeRequest = useUIStore((s) => s.clearNodeRequest);

  const isMobilePanelOpen = useUIStore((s) => s.isMobilePanelOpen);
  const setMobilePanelOpen = useUIStore((s) => s.setMobilePanelOpen);

  const { data, isLoading, isError } = useGraph(selectedAppId);

  const [nodes, setNodes, onNodesChange] =
    useNodesState<Node<ServiceNodeData>>([]);
  const [edges, setEdges, onEdgesChange] =
    useEdgesState<Edge>([]);

  // Normalize incoming graph data
  useEffect(() => {
    if (!data) return;

    const typedNodes: Node<ServiceNodeData>[] = data.nodes.map((n) => {
      const raw = n.data as Partial<ServiceNodeData>;
      const nodeType =
        raw.type === "database" ? "database" : "service";

      return {
        ...n,
        type: nodeType,
        data: {
          type: nodeType,
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

  // Inspector → canvas updates
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

  // Add node helper
  const addNode = useCallback(
    (type: "service" | "database") => {
      const id = crypto.randomUUID();

      setNodes((nds) => [
        ...nds,
        {
          id,
          type,
          position: {
            x: 200 + Math.random() * 120,
            y: 200 + Math.random() * 120,
          },
          data: {
            type,
            label: type === "service" ? "New Service" : "New Database",
            description: "",
            status: "Healthy",
            load: 0,
          },
        },
      ]);

      setSelectedNode(id);
    },
    [setNodes, setSelectedNode]
  );

  // Handle Add Node command from TopBar
  useEffect(() => {
    if (!nodeToAdd) return;

    addNode(nodeToAdd);
    clearNodeRequest();
  }, [nodeToAdd, addNode, clearNodeRequest]);

  const onNodeClick = useCallback(
    (_: unknown, node: Node<ServiceNodeData>) => {
      setSelectedNode(node.id);
      if (window.innerWidth < 768) {
        setMobilePanelOpen(true);
      }
    },
    [setSelectedNode, setMobilePanelOpen]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setMobilePanelOpen(false);
  }, [setSelectedNode, setMobilePanelOpen]);

  // Delete / Backspace
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!selectedNodeId) return;

      if (e.key === "Delete" || e.key === "Backspace") {
        setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId));
        setEdges((eds) =>
          eds.filter(
            (e) =>
              e.source !== selectedNodeId &&
              e.target !== selectedNodeId
          )
        );
        setSelectedNode(null);
        setMobilePanelOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedNodeId, setNodes, setEdges, setSelectedNode, setMobilePanelOpen]);

  // 🔑 Keyboard shortcuts: S / D / F
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key.toLowerCase() === "s") {
        addNode("service");
      }

      if (e.key.toLowerCase() === "d") {
        addNode("database");
      }

      if (e.key.toLowerCase() === "f") {
        document
          .querySelector<HTMLButtonElement>(
            '[aria-label="fit view"]'
          )
          ?.click();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [addNode]);

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

      {/* Desktop inspector */}
      {selectedNode && (
        <div className="hidden md:block absolute right-0 top-0 h-full w-64 border-l bg-background">
          <NodeInspector
            node={selectedNode}
            onUpdate={updateNodeData}
          />
        </div>
      )}

      {/* Mobile drawer */}
      {selectedNode && isMobilePanelOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobilePanelOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 bg-background shadow-lg">
            <NodeInspector
              node={selectedNode}
              onUpdate={updateNodeData}
            />
          </div>
        </div>
      )}
    </div>
  );
}
