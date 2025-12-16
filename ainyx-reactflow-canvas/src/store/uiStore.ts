import { create } from "zustand";

interface UIState {
  selectedAppId: string | null;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: "config" | "runtime";

  setSelectedApp: (id: string | null) => void;
  setSelectedNode: (id: string | null) => void;
  setMobilePanelOpen: (open: boolean) => void;
  setInspectorTab: (tab: "config" | "runtime") => void;
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
