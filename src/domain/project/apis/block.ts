import instance from "../../common/apis/instance";
import type { BlockListResponse } from "../types/block";

export const getBlockList = async (): Promise<BlockListResponse[]> => {
  const { data } = await instance.get<BlockListResponse[]>("/test/block/list");

  console.log(data);
  return data;
};
