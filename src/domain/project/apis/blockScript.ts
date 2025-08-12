import { api } from "@common/apis/axios";

export interface BlockScriptStatus {
  blockScriptStatus: "ENABLED" | "DISABLED";
}

export const toggleBlockScriptStatus = async (
  uuid: string,
  status: "ENABLED" | "DISABLED"
): Promise<void> => {
  await api.put(`/block-script/activation/${uuid}`, {
    blockScriptStatus: status,
  });
};

export const saveBlockScript = async (
  uuid: string,
  blockScript: string
): Promise<any> => {
  const response = await api.put(`/block-script/${uuid}`, blockScript);
  return response.data;
};
