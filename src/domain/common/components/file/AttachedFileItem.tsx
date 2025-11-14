import { formatFileSizeToKB } from "@common/utils/formatFilesize";
import type { UploadedFile } from "./MultiFileUploader";
type AttachedFileItemProps = {
  uploadedFile: UploadedFile;
  handleDeleteClick: (uploadedFile: UploadedFile) => void;
};

export function AttachedFileItem({
  uploadedFile,
  handleDeleteClick,
}: AttachedFileItemProps) {
  const { file, status } = uploadedFile;
  return (
    <>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-rbPrimaryColor flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <div className="flex-1 min-w-0">
          <div
            className={`font-medium truncate ${
              status === "failed"
                ? "text-red-500"
                : status === "loading"
                  ? "text-gray-400"
                  : "text-gray-800"
            }`}
          >
            {file.name}
          </div>
          <div className="text-[#888888] text-sm">
            {formatFileSizeToKB(file.size)}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-4">
        {/* 파일 교체 버튼 */}
        {/* <button
          // onClick={() => handleEditClick(id, attachmentUuid)}
          type="button"
          className="p-2 rounded-lg hover:bg-white transition-colors"
          title="파일 교체"
        >
          <img src="/btnEdit.png" className="w-5 h-5" alt="수정" />
        </button> */}
        {status === "loading" ? (
          <div className="p-2">
            <svg
              className="animate-spin h-5 w-5 text-rbPrimaryColor"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        ) : (
          <button
            onClick={() => handleDeleteClick(uploadedFile)}
            type="button"
            className="p-2 rounded-lg hover:bg-white transition-colors"
            title="파일 삭제"
          >
            <img src="/trashcan.png" className="w-5 h-5" alt="삭제" />
          </button>
        )}
      </div>
    </>
  );
}
