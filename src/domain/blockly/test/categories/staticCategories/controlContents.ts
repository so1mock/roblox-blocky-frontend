import type { DefinitionForToolbox } from "src/domain/place/types/block";

export const controlContents: DefinitionForToolbox[] = [
  {
    type: "if_block",
    kind: "block",
  },
  {
    type: "if_else_block",
    kind: "block",
  },
  {
    type: "stop_block",
    kind: "block",
  },
];
