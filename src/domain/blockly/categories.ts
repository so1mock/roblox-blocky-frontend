import type {
  BlockListByCategory,
  DefinitionForToolbox,
} from "src/domain/myPlaces/types/block";

export const getBlocksByCategory = (
  blockListByCategory: BlockListByCategory,
): DefinitionForToolbox[] =>
  blockListByCategory.blocks.map((block) => ({
    kind: block.toolBoxDefinition.kind,
    type: block.type,
    inputs: block.toolBoxDefinition.inputs,
  }));
