import type { ImageFileType } from "@common/types/image";

/**
 * 주어진 파일이 허용된 이미지 확장자인지 검증합니다.
 * 잘못된 경우 Error를 던지고, 올바른 경우 타입을 보장합니다.
 */
export function validateImageExtension(
  file: File,
): asserts file is File & { name: `${string}.${ImageFileType}` } {
  const ext = file.name.split(".").pop()?.toLowerCase();

  const allowed: ImageFileType[] = ["jpeg", "jpg", "png"];

  if (!ext || !allowed.includes(ext as ImageFileType)) {
    throw new Error(
      "허용되지 않은 이미지 형식입니다. (jpeg, jpg, png만 가능합니다)",
    );
  }
}
