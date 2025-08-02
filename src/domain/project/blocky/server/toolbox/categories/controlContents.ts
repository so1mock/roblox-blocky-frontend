import type { BlockListResponse } from "../../../../types/block";

export const makeControlContents = (
  ControlBlockListByCategory: BlockListResponse,
) =>
  ControlBlockListByCategory.blocks.map((block) => ({
    kind: block.toolBoxDefinition.kind,
    type: block.type,
    inputs: block.toolBoxDefinition.toolboxInputs,
  }));
