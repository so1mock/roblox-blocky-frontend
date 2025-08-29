export interface PlaceSummary {
  uuid: string;
  name: string;
  description: string;
  ownerName: string;
  lastModifiedAt: string;
}

export interface WorkspaceObject {
  uuid: string;
  name: string;
  type: string;
  children: WorkspaceObject[];
  isBlockScriptEnabled?: boolean;
  blockScript?: string;
}

export interface WorkspaceData {
  placeSummary: PlaceSummary;
  objects: WorkspaceObject[];
}
