import { create } from "zustand";
export type InspectorTab = "config" | "runtime";

interface UIState {
  selectedAppId: string | null;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: InspectorTab;

  setSelectedApp: (id: string | null) => void;
  setSelectedNode: (id: string | null) => void;
  setMobilePanelOpen: (open: boolean) => void;
  setInspectorTab: (tab: InspectorTab) => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedAppId: null,
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: "config",

  setSelectedApp: (id) => set({ selectedAppId: id }),
  setSelectedNode: (id) => set({ selectedNodeId: id }),
  setMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),
  setInspectorTab: (tab) => set({ activeInspectorTab: tab }),
}));
