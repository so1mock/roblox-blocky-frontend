import type {
  BlockListByCategory,
  DefinitionForToolbox,
} from "src/domain/myPlaces/types/block";

export const getBlocksByCategory = (
  blockListByCategory: BlockListByCategory,
): DefinitionForToolbox[] =>
  blockListByCategory.blocks.map((block) => ({
    kind: block.toolboxDefinition.kind,
    type: block.type,
    inputs: block.toolboxDefinition.inputs,
  }));
