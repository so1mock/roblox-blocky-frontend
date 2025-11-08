import type { DefinitionForToolbox } from "@place/types/block";

export const instanceContents: DefinitionForToolbox[] = [
  {
    type: "parent_block",
    kind: "block",
  },
  {
    type: "find_first_Child_block",
    kind: "block",
  },
  {
    type: "wait_for_child_block",
    kind: "block",
  },
  {
    kind: "block",
    type: "script",
  },
];
