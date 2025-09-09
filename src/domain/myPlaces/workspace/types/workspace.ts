export interface PlaceSummary {
  uuid: string;
  name: string;
  description: string;
  ownerName: string;
  lastModifiedAt: string;
}

export type BlockScript = {
  blocks: {
    languageVersion: number;
    blocks: Array<Record<string, any>>; // 블록 내용이 자유로운 경우
  };
  variables?: Array<{
    name: string;
    id: string;
    type: string;
  }>;
};

export interface WorkspaceObject {
  uuid: string;
  name: string;
  type: string;
  children: WorkspaceObject[];
  isBlockScriptEnabled?: boolean;
  blockScript?: BlockScript;
}

export interface WorkspaceData {
  placeSummary: PlaceSummary;
  objects: WorkspaceObject[];
}
