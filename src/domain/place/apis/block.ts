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
  toolBoxDefinition: {
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
    const { data } = await api.get<ServerBlockListByCategory[]>("/block/list");
    const { data: categoryListResponse } = await api.get(
      "/block/custom/categories",
    );

    for (const categoryResponse of categoryListResponse.categories) {
      const { data: category } = await api.get<ServerBlockListByCategory>(
        `/block/list/${categoryResponse.name}`,
      );

      data.push(category);
    }

    // 변환/보정 로직
    return data.map((category) => {
      return {
        categoryName: category.categoryName,
        blocks: category.blocks.map((block) => {
          return {
            type: block.type,
            toolboxDefinition: {
              kind: block.toolBoxDefinition.kind,
              inputs: block.toolBoxDefinition.toolboxInputs,
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
          };
        }),
      };
    });
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};
