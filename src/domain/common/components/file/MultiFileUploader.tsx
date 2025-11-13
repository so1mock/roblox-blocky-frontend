import { useState } from "react";
import { AttachedFileItem } from "./AttachedFileItem";

interface UploadedFile {
  id: number;
  file: File;
}

function MultiFileUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  /** 파일 선택 시 */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const newFiles = Array.from(e.target.files).map((file, index) => ({
      id: Date.now() + index, // 고유 ID
      file,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    e.target.value = ""; // 같은 파일 다시 선택 가능하게 초기화
  };

  /** 파일 수정 (해당 파일만 변경) */
  const handleEditClick = (id: number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.doc,.docx";
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const newFile = target.files?.[0];
      if (!newFile) return;

      setFiles((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, file: newFile } : item,
        ),
      );
    };
    input.click();
  };

  /** 파일 삭제 */
  const handleDeleteClick = (id: number) => {
    setFiles((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="mt-8 space-y-4">
      {/* 파일 선택 버튼 */}
      <div className="flex justify-center">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="multiFileUpload"
        />
        <label
          htmlFor="multiFileUpload"
          className="inline-flex items-center gap-2 px-6 py-3 bg-rbPrimaryColor text-white rounded-2xl cursor-pointer hover:opacity-90 transition-all shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
          <span className="font-medium">파일 첨부</span>
        </label>
      </div>

      {/* 업로드된 파일 리스트 */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm text-gray-600 font-medium">
            첨부된 파일 ({files.length})
          </div>
          <ul className="space-y-2">
            {files.map(({ id, file }) => (
              <li
                key={id}
                className="flex items-center justify-between bg-[#F2F9FF] rounded-xl px-4 py-3 border border-[#E0F0FF]"
              >
                <AttachedFileItem
                  id={id}
                  file={file}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MultiFileUploader;
