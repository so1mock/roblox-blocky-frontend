import { useMutation } from "@tanstack/react-query";
import { createInviteCode } from "../apis/user";

// 서버는 GET 이지만 버튼을 눌렀을 때만 코드를 발급받으므로 mutation 으로 다룬다
export const useCreateInviteCodeMutation = () => {
  return useMutation({
    mutationFn: (groupUuid: string) => createInviteCode(groupUuid),
  });
};
