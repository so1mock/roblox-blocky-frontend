// SHA-256 해시 계산
export async function calculateSHA256(file: File): Promise<string> {
  // 1. 파일을 ArrayBuffer로 읽기
  const arrayBuffer = await file.arrayBuffer();

  // 2. SHA-256 해시 계산
  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);

  // 3. Base64로 인코딩
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const base64 = btoa(String.fromCharCode(...hashArray));

  return base64;
}
