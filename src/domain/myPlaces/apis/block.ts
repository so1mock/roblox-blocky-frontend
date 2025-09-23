import { AxiosError } from "axios";
import { api } from "../../common/apis/axios";
import type {
  BlockComponent,
  BlockListByCategory,
  Category,
  ShadowValue,
} from "../types/block";

// src/domain/myPlaces/types/block.ts

// 서버에서 내려오는 원본 타입
export type ServerBlock = {
  type: string;
  definition?: {
    style?: string;
    output?: string;
    inputsInline?: boolean;
    previousStatement?: boolean;
    nextStatement?: boolean;
    components?: BlockComponent[];
  };
  toolboxDefinition: {
    kind: "block" | "sep" | "button" | "label";
    toolboxInputs?: {
      [inputName: string]: {
        shadow: ShadowValue;
      };
    };
  };
};

export type ServerBlockListByCategory = {
  categoryName: Category;
  blocks: ServerBlock[];
};

export const getBlockList = async (): Promise<BlockListByCategory[]> => {
  try {
    const { data } =
      await api.get<ServerBlockListByCategory[]>("/test/block/list");

    // 변환/보정 로직
    return data.map((category) => ({
      categoryName: category.categoryName,
      blocks: category.blocks.map((block) => ({
        type: block.type,
        toolboxDefinition: {
          kind: block.toolboxDefinition.kind,
          inputs: block.toolboxDefinition.toolboxInputs,
          type: block.type, // 👈 Blockly에서 요구하므로 추가
          // callbackKey: "" 추구 추가될 수 있는 속성
        },
        blockDefinition: {
          style: block.definition?.style ?? "",
          output: block.definition?.output ?? "",
          inputsInline: block.definition?.inputsInline ?? true,
          previousStatement: block.definition?.previousStatement ?? false,
          nextStatement: block.definition?.nextStatement ?? false,
          components: block.definition?.components ?? [],
        },
      })),
    }));
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};
