import type { FileInfo } from "@common/types/file";
import { formatFileSizeToKB } from "@common/utils/formatFilesize";

export function DownloadableFileItem({ fileInfo }: { fileInfo: FileInfo }) {
  const handleDownload = () => {
    // 임시 <a> 태그 생성
    const link = document.createElement("a");
    link.href = fileInfo.fileSrc;
    link.download = fileInfo.fileName; // 다운로드될 파일명
    link.target = "_blank"; // 새 탭에서 열기
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex items-center justify-between w-full">
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
          <div className="text-gray-800 font-medium truncate">
            {fileInfo.fileName}
          </div>
          <div className="text-[#888888] text-sm">
            {formatFileSizeToKB(fileInfo.fileSize)}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="p-2 rounded-lg hover:bg-white transition-colors cursor-pointer"
        onClick={handleDownload}
        title="파일 다운로드"
      >
        <img src="/download.png" className="w-5 h-5" alt="다운로드" />
      </button>
    </div>
  );
}
