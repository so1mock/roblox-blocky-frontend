import { create } from "zustand";
import type { Place, WorkspaceObject } from "../types/workspace";

interface WorkspaceDataStoreType {
  workspaceData: Place | null;
  selectedScript: WorkspaceObject | undefined;
  setSelectedScript: (scriptObject: WorkspaceObject | undefined) => void;
  setWorkspaceData: (workspaceData: Place) => void;
}

export const useWorkspaceDataStore = create<WorkspaceDataStoreType>((set) => ({
  workspaceData: null,
  selectedScript: undefined,
  setSelectedScript: (scriptObject) => set({ selectedScript: scriptObject }),
  setWorkspaceData: (workspaceData) => set({ workspaceData }),
}));
