import type { BlockListByCategoryResponse } from "src/domain/myPlaces/types/block";

export const makeServerCategoryContents = (
  blockListByCategory: BlockListByCategoryResponse,
) =>
  blockListByCategory.blocks.map((block) => ({
    kind: block.toolBoxDefinition.kind,
    type: block.type,
    inputs: block.toolBoxDefinition.toolboxInputs,
  }));
