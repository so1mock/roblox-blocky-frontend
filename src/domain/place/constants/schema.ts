import { z } from "zod";

export const variableSchema = z.object({
  // Blockly 변수명은 식별자 규칙을 따른다 (영문자·언더스코어로 시작, 이후 영숫자·언더스코어)
  name: z
    .string()
    .trim()
    .min(1, "변수 이름을 입력해주세요")
    .regex(
      /^[a-zA-Z_][a-zA-Z0-9_]*$/,
      "변수 이름은 영문자, 숫자, 언더스코어만 사용 가능하며 숫자로 시작할 수 없습니다",
    ),
});

export type VariableForm = z.infer<typeof variableSchema>;
