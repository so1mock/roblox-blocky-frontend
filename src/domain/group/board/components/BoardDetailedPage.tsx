import Button from "@common/components/Button";
import ReadOnlyReactQuillEditor from "@common/components/ReadOnlyReactQuillEditor";
import { formatFileSizeToKB } from "@common/utils/formatFilesize";
import { formatIsoStringToDate } from "@common/utils/formatIsoStringToDate";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@user/stores/authStore";
import { useBoardInfoQuery } from "../hooks/useBoardInfoQuery";
import { useDeleteBoardMutation } from "../hooks/useDeleteBoardMutation";

const mockBoardInfo = {
  title: "잼민이는 못 깨는 타워 따라 만들기",
  createdAt: "2025-10-10T09:30:00Z",
  content: `<p>이곳은 게시글 내용이 들어가는 영역입니다.</p>`,
  attachedFiles: [
    { id: 1, name: "예시파일.pdf", size: 1024 * 100 },
    { id: 2, name: "이미지.png", size: 1024 * 200 },
  ],
};

function BoardDetailedPage({
  groupUuid,
  boardUuid,
}: {
  groupUuid: string;
  boardUuid: string;
}) {
  const navigate = useNavigate();
  const { userInfo } = useAuthStore();
  // 예시 데이터
  const { data: boardInfo, error } = useBoardInfoQuery(groupUuid, boardUuid);

  const deleteMutation = useDeleteBoardMutation(groupUuid, boardUuid);

  const handleDelete = async () => {
    const ok = confirm("정말 삭제하시겠습니까?");
    if (!ok) return;
    try {
      await deleteMutation.mutateAsync();
      alert("게시글이 삭제되었습니다.");
      navigate({ to: `/teacher/group/${groupUuid}` });
    } catch {
      alert("삭제에 실패했습니다.");
    }
  };

  const handleEdit = () => {
    navigate({
      to: `/teacher/group/${groupUuid}/board/${boardUuid}/edit`,
    });
  };

  if (error) {
    alert("게시글 정보를 불러오지 못했습니다." + error.message);
    navigate({ to: `/teacher/group/${groupUuid}/` });
  }

  return (
    <div className="w-[1600px] mx-auto flex justify-center gap-24 py-10">
      <div className="w-[1200px] bg-white p-8 rounded-2xl">
        {/* 제목 */}
        {boardInfo && (
          <h1 className="font-bold text-4xl text-center mb-4">
            {boardInfo.title}
          </h1>
        )}

        {/* 작성자 & 작성일 */}
        <div className="flex justify-center items-center mb-8">
          <div className="h-[19px]">
            <img src="/schedule.png" className="mr-1" />
          </div>
          {boardInfo && (
            <span className="text-gray-500 ">
              {formatIsoStringToDate(boardInfo.createdAt)}
            </span>
          )}
        </div>
        <hr className="bg-gray-300 h-[1px] border-0 my-12" />
        {userInfo?.role === "EDUCATOR" && (
          <div className="flex justify-end mb-4 gap-2">
            <Button
              text="수정"
              xSize={6}
              ySize={2}
              handleButtonClick={handleEdit}
            />
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="px-4 py-2 rounded-2xl border border-[#DDDDDD] text-[#F05460] bg-white cursor-pointer disabled:opacity-60"
            >
              삭제
            </button>
          </div>
        )}
        {/* 본문 */}
        <div className="bg-white rounded-2xl view mb-16">
          {boardInfo && (
            <ReadOnlyReactQuillEditor contents={boardInfo.content} />
          )}
        </div>

        {/* 첨부파일 */}
        {mockBoardInfo.attachedFiles.length > 0 && (
          <div className="">
            <ul className="flex flex-col gap-2">
              {mockBoardInfo.attachedFiles.map((file) => (
                <li
                  key={file.id}
                  className="flex items-center justify-between bg-[#F2F9FF] rounded-xl px-4 py-2"
                >
                  <div>
                    <span className="text-rbPrimaryColor text-md mr-8">
                      첨부파일
                    </span>
                    <span className="text-gray-800 font-medium truncate max-w-[200px] mr-4">
                      {file.name}
                    </span>
                    <span className="text-[#888888] font-medium truncate max-w-[200px]">
                      {formatFileSizeToKB(file.size)}
                    </span>
                  </div>
                  <button type="button" className="cursor-pointer">
                    <img src="/download.png" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <hr className="bg-gray-300 h-[1px] border-0 my-12" />
        {/* 버튼 */}
        <div className="text-center">
          <Button
            text="목록으로"
            xSize={8}
            ySize={2}
            handleButtonClick={() => {
              // 목록으로 돌아가기
              if (userInfo?.role === "EDUCATOR") {
                navigate({ to: `/teacher/group/${groupUuid}` });
              } else {
                navigate({ to: `/student/group/${groupUuid}` });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default BoardDetailedPage;
