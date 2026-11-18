import Button from "@common/components/Button";
import MultiFileUploader from "@common/components/file/MultiFileUploader";
import ReactQuillEditor from "@common/components/ReactQuillEditor";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError } from "@common/apis/ApiError";
import { useCreateBoardMutation } from "../hooks/useCreateBoardMutation";
import { boardSchema, type BoardForm } from "../constants/schema";

function BoardCreatePage({ groupUuid }: { groupUuid: string }) {
  const navigate = useNavigate();
  const [attachmentUuids, setAttachmentUuids] = useState<string[]>([]);
  const [countFailedFild, setCountFailedFile] = useState<number>(0);
  const [countUploadingFile, setCountLoadingFile] = useState<number>(0);
  const { mutateAsync: handleCreateBoard } = useCreateBoardMutation(groupUuid);

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<BoardForm>({
    resolver: zodResolver(boardSchema),
    defaultValues: { title: "", content: "" },
  });

  const onSubmit = async (form: BoardForm) => {
    try {
      await handleCreateBoard({ ...form, attachmentUuids });
      navigate({ to: `/teacher/group/${groupUuid}` });
    } catch (error) {
      setError("root", {
        message:
          error instanceof ApiError ? error.message : "작성에 실패했습니다.",
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
                disabled={
                  isSubmitting || 0 < countUploadingFile || 0 < countFailedFild
                }
                text={isSubmitting ? "작성 중..." : "작성 완료"}
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

export default BoardCreatePage;
