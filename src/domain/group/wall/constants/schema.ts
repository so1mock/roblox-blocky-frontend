import { z } from "zod";

export const wallMessageSchema = z.object({
  content: z.string().trim().min(1, "내용을 입력해주세요."),
});

export type WallMessageForm = z.infer<typeof wallMessageSchema>;
