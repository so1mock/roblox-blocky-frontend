import { api } from "../../common/apis/axios";
import type { BlockListResponse } from "../types/block";

export const getBlockList = async (): Promise<BlockListResponse[]> => {
  const { data } = await api.get<BlockListResponse[]>("/test/block/list");

  console.log(data);
  return data;
};

export const parseBlocks = async (blocks: any): Promise<any> => {
  const { data } = await api.post("/test/block/parse", { blocks });
  return data;
};
