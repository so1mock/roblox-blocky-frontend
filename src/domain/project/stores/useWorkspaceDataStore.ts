import { create } from "zustand";
import type { WorkspaceData, WorkspaceObject } from "../types/workspace";

interface WorkspaceDataStoreType {
  workspaceData: WorkspaceData | null;
  selectedScript: WorkspaceObject | undefined;
  setSelectedScript: (scriptObject: WorkspaceObject | undefined) => void;
  setWorkspaceData: (workspaceData: WorkspaceData) => void;
}

export const useWorkspaceDataStore = create<WorkspaceDataStoreType>((set) => ({
  workspaceData: null,
  selectedScript: undefined,
  setSelectedScript: (scriptObject) => set({ selectedScript: scriptObject }),
  setWorkspaceData: (workspaceData) => set({ workspaceData }),
}));
