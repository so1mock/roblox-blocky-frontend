import Button from "@common/components/Button";
import MultiFileUploader from "@common/components/file/MultiFileUploader";
import ReactQuillEditor from "@common/components/ReactQuillEditor";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCreateBoardMutation } from "../hooks/useCreateBoardMutation";

function BoardCreatePage({ groupUuid }: { groupUuid: string }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachmentUuids, setAttachmentUuids] = useState<string[]>([]);
  const [countFailedFild, setCountFailedFile] = useState<number>(0);
  const [countUploadingFile, setCountLoadingFile] = useState<number>(0);
  const { mutateAsync: handleCreateBoard } = useCreateBoardMutation(groupUuid);

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

          {/* 파일 첨부 영역 */}
          <div className="px-4">
            <MultiFileUploader
              setCountLoadingFile={setCountLoadingFile}
              setCountFailedFile={setCountFailedFile}
              setAttachmentUuids={setAttachmentUuids}
            />
          </div>

          <hr className="bg-gray-300 h-[1px] border-0 mt-12" />
          <div className="flex items-center justify-end gap-4 mt-8">
            <div>
              <Button
                disabled={0 < countUploadingFile || 0 < countFailedFild}
                text="작성 완료"
                handleButtonClick={async () => {
                  if (title.length === 0) {
                    alert("게시글의 제목은 빈 값일 수 없습니다.");
                    return;
                  }
                  await handleCreateBoard({
                    title: title,
                    content: content,
                    attachmentUuids: attachmentUuids,
                  });
                  navigate({ to: `/teacher/group/${groupUuid}` });
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

export default BoardCreatePage;
