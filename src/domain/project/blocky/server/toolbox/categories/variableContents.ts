import type { BlockListResponse } from "../../../../types/block";

export const makeVariableContents = (blockListResponse: BlockListResponse) => {
  return blockListResponse.blocks.map((block) => ({
    kind: "block",
    type: block.type,
  }));
};
