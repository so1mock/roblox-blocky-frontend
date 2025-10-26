import type { PlaceSummary } from "../../types/place";
import type { ObjectType } from "./object";

export type BlockScript = {
  blocks: {
    languageVersion: number;
    blocks: Array<Record<string, unknown>>; // 블록 내용이 자유로운 경우
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
  type: ObjectType;
  children: WorkspaceObject[];
  isBlockScriptEnabled?: boolean;
  blockScript?: BlockScript;
}

export interface Place {
  placeSummary: PlaceSummary;
  objects: WorkspaceObject[];
}
