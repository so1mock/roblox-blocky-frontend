import type { DefinitionForToolbox } from "@place/types/block";

export const loopContents: DefinitionForToolbox[] = [
  {
    type: "wait_block",
    kind: "block",
  },
  {
    type: "repeat_times_block",
    kind: "block",
  },
  {
    type: "infinte_repeat_block",
    kind: "block",
  },
  {
    type: "repeat_until_block",
    kind: "block",
  },
  {
    type: "continue_block",
    kind: "block",
  },
  {
    type: "break_block",
    kind: "block",
  },
];
