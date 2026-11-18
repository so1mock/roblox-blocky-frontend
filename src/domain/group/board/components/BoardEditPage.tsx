import Button from "@common/components/Button";
import MultiFileUploader from "@common/components/file/MultiFileUploader";
import ReactQuillEditor from "@common/components/ReactQuillEditor";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError } from "@common/apis/ApiError";
import { useBoardInfoQuery } from "../hooks/useBoardInfoQuery";
import { useUpdateBoardMutation } from "../hooks/useUpdateBoardMutation";
import type { UploadedFileInfo } from "@common/types/file";
import { boardSchema, type BoardForm } from "../constants/schema";

function BoardEditPage({
  groupUuid,
  boardUuid,
}: {
  groupUuid: string;
  boardUuid: string;
}) {
  const navigate = useNavigate();
  const [attachmentUuids, setAttachmentUuids] = useState<string[]>([]);
  const [countFailedFild, setCountFailedFile] = useState<number>(0);
  const [countUploadingFile, setCountLoadingFile] = useState<number>(0);
  const { mutateAsync: handleEditBoard } = useUpdateBoardMutation(
    groupUuid,
    boardUuid,
  );
  const [initialFiles, setInitialFiles] = useState<UploadedFileInfo[]>([]);

  const { data: boardInfo } = useBoardInfoQuery(groupUuid, boardUuid);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<BoardForm>({
    resolver: zodResolver(boardSchema),
    defaultValues: { title: "", content: "" },
  });

  // 조회가 끝나면 폼을 서버 값으로 채운다
  useEffect(() => {
    if (!boardInfo) return;

    reset({ title: boardInfo.title, content: boardInfo.content });
    setAttachmentUuids(
      boardInfo.attachments.map((attachment) => attachment.attachmentUuid),
    );
    setInitialFiles(
      boardInfo.attachments.map((attachment, index) => ({
        id: Date.now() + index,
        file: new File([], attachment.fileName),
        fileName: attachment.fileName,
        fileSize: attachment.fileSize,
        status: "success",
        attachmentUuid: attachment.attachmentUuid,
      })),
    );
  }, [boardInfo, reset]);

  const onSubmit = async (form: BoardForm) => {
    try {
      await handleEditBoard({ ...form, attachmentUuids });
      navigate({ to: `/teacher/group/${groupUuid}/board/${boardUuid}` });
    } catch (error) {
      setError("root", {
        message:
          error instanceof ApiError ? error.message : "수정에 실패했습니다.",
      });
    }
  };

  return (
    <div className="w-[1600px] mx-auto flex justify-center gap-24">
      <div className="w-[1200px]">
        <h1 className="font-bold text-4xl">게시판</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 bg-white my-8 rounded-2xl"
        >
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-xl font-bold"
            placeholder="제목을 입력해주세요."
            {...register("title")}
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
          )}
          <hr className="bg-gray-300 h-[1px] border-0 my-12" />
          <div className="px-4 write">
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <ReactQuillEditor
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          {/* 파일 첨부 영역 */}
          <div className="px-4">
            <MultiFileUploader
              setCountLoadingFile={setCountLoadingFile}
              setCountFailedFile={setCountFailedFile}
              setAttachmentUuids={setAttachmentUuids}
              initialFiles={initialFiles}
            />
          </div>

          <hr className="bg-gray-300 h-[1px] border-0 mt-12" />
          {errors.root && (
            <p className="mt-4 text-sm text-red-600">{errors.root.message}</p>
          )}
          <div className="flex items-center justify-end gap-4 mt-8">
            <div>
              <Button
                type="submit"
                text={isSubmitting ? "수정 중..." : "수정 완료"}
                disabled={
                  isSubmitting || 0 < countUploadingFile || 0 < countFailedFild
                }
                xSize={8}
                ySize={2}
              />
            </div>

            <div>
              <Button
                text="목록으로"
                handleButtonClick={() => {
                  navigate({ to: `/teacher/group/${groupUuid}` });
                }}
                xSize={8}
                ySize={2}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BoardEditPage;
