import { formatFileSizeToKB } from "@common/utils/formatFilesize";
type AttachedFileItemProps = {
  id: number;
  file: File;
  handleEditClick: (id: number) => void;
  handleDeleteClick: (id: number) => void;
};

export function AttachedFileItem({
  id,
  file,
  handleEditClick,
  handleDeleteClick,
}: AttachedFileItemProps) {
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
          <div className="text-gray-800 font-medium truncate">{file.name}</div>
          <div className="text-[#888888] text-sm">
            {formatFileSizeToKB(file.size)}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-4">
        <button
          onClick={() => handleEditClick(id)}
          type="button"
          className="p-2 rounded-lg hover:bg-white transition-colors"
          title="파일 교체"
        >
          <img src="/btnEdit.png" className="w-5 h-5" alt="수정" />
        </button>
        <button
          onClick={() => handleDeleteClick(id)}
          type="button"
          className="p-2 rounded-lg hover:bg-white transition-colors"
          title="파일 삭제"
        >
          <img src="/trashcan.png" className="w-5 h-5" alt="삭제" />
        </button>
      </div>
    </>
  );
}
