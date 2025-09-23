import type { DefinitionForToolbox } from "src/domain/myPlaces/types/block";

export const eventContents: DefinitionForToolbox[] = [
  {
    type: "touched_block",
    kind: "block",
  },
  {
    type: "player_added_block",
    kind: "block",
  },
  {
    type: "player_remove_block",
    kind: "block",
  },
  {
    type: "key_input_block",
    kind: "block",
  },
];
