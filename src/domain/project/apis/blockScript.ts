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
