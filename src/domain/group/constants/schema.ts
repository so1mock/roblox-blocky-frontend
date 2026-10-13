import { z } from "zod";

export const createGroupSchema = z.object({
  name: z.string().trim().min(1, "반 이름을 입력해주세요."),
  description: z.string().trim(),
});

export const joinGroupSchema = z.object({
  inviteCode: z.string().trim().min(1, "초대 코드를 입력해주세요."),
});

export type CreateGroupForm = z.infer<typeof createGroupSchema>;
export type JoinGroupForm = z.infer<typeof joinGroupSchema>;
