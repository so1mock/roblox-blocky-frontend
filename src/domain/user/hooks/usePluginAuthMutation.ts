import { useMutation } from "@tanstack/react-query";
import { getPluginAuth } from "@user/apis/auth";

export const usePluginAuthMutation = () => {
  return useMutation({
    mutationFn: (userCode: string) => getPluginAuth(userCode),
  });
};
