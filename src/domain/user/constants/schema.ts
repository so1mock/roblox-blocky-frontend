import { z } from "zod";

// 프론트에서 먼저 거르는 입력 규칙.
// 서버가 주는 에러(아이디/비밀번호 불일치 등)와는 별개로, 서버에 보내기 전에
// 형식만 확인한다. 실제 검증 책임은 여전히 서버에 있다.
export const loginSchema = z.object({
  username: z.string().trim().min(1, "아이디를 입력해주세요."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

export type LoginForm = z.infer<typeof loginSchema>;
