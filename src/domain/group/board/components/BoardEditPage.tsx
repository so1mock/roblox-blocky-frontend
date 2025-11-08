import Button from "@common/components/Button";
import MultiFileUploader from "@common/components/MultiFileUploader";
import ReactQuillEditor from "@common/components/ReactQuillEditor";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useBoardInfoQuery } from "../hooks/useBoardInfoQuery";
import { useUpdateBoardMutation } from "../hooks/useUpdateBoardMutation";

function BoardEditPage({
  groupUuid,
  boardUuid,
}: {
  groupUuid: string;
  boardUuid: string;
}) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data: boardInfo } = useBoardInfoQuery(groupUuid, boardUuid);
  const { mutateAsync: handleEditBoard } = useUpdateBoardMutation(
    groupUuid,
    boardUuid,
  );

  useEffect(() => {
    if (boardInfo) {
      setTitle(boardInfo.title);
      setContent(boardInfo.content);
    }
  }, [boardInfo]);

  return (
    <div className="w-[1600px] mx-auto flex justify-center gap-24">
      <div className="w-[1200px]">
        <h1 className="font-bold text-4xl">게시판</h1>

        <form className="p-8 bg-white my-8 rounded-2xl">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-xl font-bold"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <hr className="bg-gray-300 h-[1px] border-0 my-12" />
          <div className="px-4 write">
            <ReactQuillEditor value={content} onChange={setContent} />
          </div>
          <div className="text-center mt-8">
            <MultiFileUploader />
          </div>

          <hr className="bg-gray-300 h-[1px] border-0 mt-12" />
          <div className="flex items-center justify-end gap-4 mt-8">
            <div>
              <Button
                text="수정 완료"
                handleButtonClick={async () => {
                  await handleEditBoard({
                    title: title,
                    content: content,
                    attachmentUuids: [],
                  });
                  navigate({
                    to: `/teacher/group/${groupUuid}/board/${boardUuid}`,
                  });
                }}
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
