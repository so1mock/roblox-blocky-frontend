import type { DefinitionForToolbox } from "src/domain/myPlaces/types/block";

export const variableContents: DefinitionForToolbox[] = [
  {
    kind: "block",
    type: "variables_set",
  },
  {
    kind: "block",
    type: "variables_get",
  },
  {
    kind: "sep",
  },
  {
    kind: "block",
    type: "variables_type_check",
  },
  {
    kind: "block",
    type: "variables_type_convert",
  },
];
