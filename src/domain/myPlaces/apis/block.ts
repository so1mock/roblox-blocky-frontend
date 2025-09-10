import { AxiosError } from "axios";
import { api } from "../../common/apis/axios";
import type { BlockListByCategoryResponse } from "../types/block";

export const getBlockList = async (): Promise<
  BlockListByCategoryResponse[]
> => {
  try {
    const { data } =
      await api.get<BlockListByCategoryResponse[]>("/test/block/list");
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};
