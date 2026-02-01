import Button from "@common/components/Button";
import { useState } from "react";
import { useCreateWallMutation } from "../hooks/useCreateWallMutation";
import { useAlertModal } from "@common/hooks/useAlertModal";
import AlertModal from "@common/components/AlertModal";

function GroupWallCreateForm({
  groupUuid,
  currentPageNumber,
  pageSize,
}: {
  groupUuid: string;
  currentPageNumber: number;
  pageSize: number;
}) {
  const [content, setContent] = useState("");
  const {
    mutateAsync: createWallMutation,
    isPending: isCreatingWall,
    isError: isCreatingError,
    error: creatingError,
  } = useCreateWallMutation(groupUuid, currentPageNumber - 1, pageSize);
  const { isOpen, config, showAlert, closeAlert } = useAlertModal();

  const handleSubmit = async () => {
    const body = content.trim();
    if (!body) {
      showAlert({
        title: "담벼락작성 실패",
        message: "내용을 입력해주세요.",
        type: "warning",
      });
      return;
    }
    if (isCreatingWall) {
      return;
    }

    await createWallMutation(body);
    setContent("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="w-full relative"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
        disabled={isCreatingWall}
        className="w-full m-4 ml-0 p-6 min-h-[120px] bg-[#F9F9F9] rounded-2xl disabled:opacity-60"
      />
      <div className="absolute bottom-10 right-8">
        <Button
          text={isCreatingWall ? "게시 중..." : "게시하기"}
          handleButtonClick={handleSubmit}
        />
      </div>
      {isCreatingError && creatingError instanceof Error && (
        <div className="text-sm text-red-500 mt-2 ml-1">
          {creatingError.message}
        </div>
      )}
      <AlertModal
        isOpen={isOpen}
        onClose={closeAlert}
        title={config.title}
        message={config.message}
        type={config.type}
      />
    </form>
  );
}

export default GroupWallCreateForm;
