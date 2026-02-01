import { useEffect, useState } from "react";
import { AttachedFileItem } from "./AttachedFileItem";
import { calculateSHA256 } from "@common/utils/calculatSHA256";
import type { FileUploadInfo, UploadedFileInfo } from "@common/types/file";
import { useUploadFileMutation } from "@group/board/hooks/useUploadFileMutation";

function MultiFileUploader({
  setCountLoadingFile,
  setCountFailedFile,
  setAttachmentUuids,
  initialFiles,
}: {
  setCountLoadingFile: (
    CountLoadingFile: number | ((prev: number) => number),
  ) => void;
  setCountFailedFile: (
    countFailedFile: number | ((prev: number) => number),
  ) => void;
  setAttachmentUuids: (
    attachmentUuids: string[] | ((prev: string[]) => string[]),
  ) => void;
  initialFiles?: UploadedFileInfo[];
}) {
  const [files, setFiles] = useState<UploadedFileInfo[]>([]);
  const { mutateAsync: handleUploadfile } = useUploadFileMutation();

  useEffect(() => {
    if (initialFiles) {
      setFiles(initialFiles);
    }
  }, [initialFiles]);

  // files 중에서 id가 일치하는 것을 찾아 updates 반영
  const updateFile = (id: number, updates: Partial<UploadedFileInfo>) => {
    setFiles((prev) =>
      prev.map((file) => (file.id === id ? { ...file, ...updates } : file)),
    );
  };

  /** 파일 선택 시 */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    // 추가된 파일 목록 생성
    const newFiles: UploadedFileInfo[] = Array.from(e.target.files)
      .filter((file) => file.name.trim() !== "") // 파일 이름이 빈칸이면 제외
      .map((file, index) => ({
        id: Date.now() + index, // 고유 ID
        file,
        fileName: file.name,
        fileSize: file.size,
        status: "idle",
      }));

    setFiles((prev) => [...prev, ...newFiles]);
    e.target.value = ""; // 같은 파일 다시 선택 가능하게 초기화

    // newFiles에 대해서 파일 업로드 진행
    const results = await Promise.allSettled(
      newFiles.map(async ({ id, file }) => {
        setCountLoadingFile((prev) => prev + 1);
        updateFile(id, { status: "loading" });
        try {
          const checksum = await calculateSHA256(file);
          const fileUploadInfo: FileUploadInfo = {
            fileName: file.name,
            contentLength: file.size,
            contentType: file.type,
            checksum,
          };

          const fileInfo = await handleUploadfile({ fileUploadInfo, file });
          updateFile(id, {
            status: "success",
            attachmentUuid: fileInfo.attachmentUuid,
          });
          return fileInfo.attachmentUuid;
        } catch (error) {
          setCountFailedFile((prev) => prev + 1);
          updateFile(id, { status: "failed" });
        } finally {
          setCountLoadingFile((prev) => prev - 1);
        }
      }),
    );

    // attachmentUuid 배열 갱신
    const newAttachmentUuids: string[] = results
      .filter(
        (result): result is PromiseFulfilledResult<string> =>
          result.status === "fulfilled",
      )
      .map((result) => result.value);
    setAttachmentUuids((prev) => [...prev, ...newAttachmentUuids]);
  };

  /** 파일 수정 (해당 파일만 변경) */
  // const handleEditClick = (id: number) => {
  //   const input = document.createElement("input");
  //   input.type = "file";
  //   input.accept = ".pdf,.doc,.docx";
  //   input.onchange = (e: Event) => {
  //     const target = e.target as HTMLInputElement;
  //     const newFile = target.files?.[0];
  //     if (!newFile) return;

  //     setFiles((prev) =>
  //       prev.map((item) =>
  //         item.id === id ? { ...item, file: newFile } : item,
  //       ),
  //     );
  //   };
  //   input.click();
  // };

  /** 파일 삭제 */
  const handleDeleteClick = (uploadedFile: UploadedFileInfo) => {
    setFiles((prev) => prev.filter((item) => item.id !== uploadedFile.id));
    if (uploadedFile.attachmentUuid) {
      setAttachmentUuids((prev) =>
        prev.filter((uuid) => uuid !== uploadedFile.attachmentUuid),
      );
    }
    if (uploadedFile.status === "failed") {
      setCountFailedFile((prev) => prev - 1);
    }
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
            {files.map((uploadedFile) => (
              <li
                key={uploadedFile.id}
                className="flex items-center justify-between bg-[#F2F9FF] rounded-xl px-4 py-3 border border-[#E0F0FF]"
              >
                <AttachedFileItem
                  uploadedFile={uploadedFile}
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
