export const formatFileSize = (size: number) => {
  const kb = size / 1024;
  const mb = kb / 1024;

  if (mb >= 1) {
    return `${mb.toFixed(2)} MB`; // 소수점 2자리
  }

  return `${Math.ceil(kb)} KB`;
};
