import { create } from "zustand";
import type { WorkspaceData } from "../types/workspace";

interface WorkspaceDataStoreType {
  workspaceData: WorkspaceData | null;
  setWorkspaceData: (workspaceData: WorkspaceData) => void;
}

export const useWorkspaceDataStore = create<WorkspaceDataStoreType>((set) => ({
  workspaceData: null,
  setWorkspaceData: (workspaceData) => set({ workspaceData }),
}));
