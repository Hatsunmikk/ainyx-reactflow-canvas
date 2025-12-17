import { create } from "zustand";

export type InspectorTab = "config" | "runtime";
export type AddNodeKind = "service" | "database";

interface UIState {
  selectedAppId: string | null;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: InspectorTab;

  // 🔹 command-style state
  nodeToAdd: AddNodeKind | null;

  setSelectedApp: (id: string | null) => void;
  setSelectedNode: (id: string | null) => void;
  setMobilePanelOpen: (open: boolean) => void;
  setInspectorTab: (tab: InspectorTab) => void;

  requestAddNode: (type: AddNodeKind) => void;
  clearNodeRequest: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedAppId: null,
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: "config",

  nodeToAdd: null,

  setSelectedApp: (id) => set({ selectedAppId: id }),
  setSelectedNode: (id) => set({ selectedNodeId: id }),
  setMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),
  setInspectorTab: (tab) => set({ activeInspectorTab: tab }),

  requestAddNode: (type) => set({ nodeToAdd: type }),
  clearNodeRequest: () => set({ nodeToAdd: null }),
}));
