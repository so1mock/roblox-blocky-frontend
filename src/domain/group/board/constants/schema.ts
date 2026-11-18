import { z } from "zod";

// 본문은 Quill 에디터가 비어 있어도 "<p><br></p>" 를 내보내므로 길이 검증을 걸지 않는다.
export const boardSchema = z.object({
  title: z.string().trim().min(1, "게시글의 제목은 빈 값일 수 없습니다."),
  content: z.string(),
});

export type BoardForm = z.infer<typeof boardSchema>;
