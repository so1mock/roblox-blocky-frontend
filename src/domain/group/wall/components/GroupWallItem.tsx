import { formatIsoStringToDate } from "@common/utils/formatIsoStringToDate";
import GroupWallOptions from "./GroupWallOptions";
import { useEffect, useRef, useState } from "react";
import type { WallInfo } from "../types/wall";
import { useAuthStore } from "@user/stores/authStore";
import { useDeleteWall } from "../hooks/useDeleteWall";
import { useEditWall } from "../hooks/useEditWall";

function GroupWallItem({
  wallInfo,
  groupId,
  page,
}: {
  wallInfo: WallInfo;
  groupId: string;
  page: number;
}) {
  const { userInfo } = useAuthStore();
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>(wallInfo.content);
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);
  const { mutateAsync: deleteWallMutation, isPending: isDeletingWall } =
    useDeleteWall(groupId);
  const { mutateAsync: editWallMutation, isPending: isEditingWall } =
    useEditWall(groupId, page);

  useEffect(() => {
    if (editingMode) {
      setEditedContent(wallInfo.content);
      if (editTextareaRef.current) {
        editTextareaRef.current.focus();
        editTextareaRef.current.select();
      }
    }
  }, [editingMode, wallInfo.content]);

  const handleDelete = async () => {
    if (isDeletingWall) return;
    await deleteWallMutation(wallInfo.uuid);
  };

  const handleEdit = () => {
    setIsOptionOpen(false);
    setEditingMode(true);
  };

  const handleUpdate = async (content: string) => {
    if (isEditingWall) return;
    await editWallMutation({ uuid: wallInfo.uuid, content });
    setEditingMode(false);
  };

  return (
    <div className="flex items-center relative py-6 gap-8 border-solid border-[#DEDEDE] border-b-2 bg-white">
      <div>
        {/* 아직 프로필 이미지가 구현돼있지 않음 */}
        <img
          src="/maskGroup1.png"
          alt="기본 프로필 이미지"
          className="rounded-full bg-[#E8F5FF]"
        />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <span>{wallInfo.author.nickname}</span>
          {editingMode ? (
            <textarea
              ref={editTextareaRef}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              value={editedContent}
              disabled={isEditingWall}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          ) : (
            <span className="whitespace-break-spaces">{wallInfo.content}</span>
          )}
        </div>
        <span className="text-[#888888]">
          {formatIsoStringToDate(wallInfo.createdAt)}
        </span>
      </div>
      {/* 옵션 버튼*/}
      {userInfo &&
        (userInfo.uuid === wallInfo.author.uuid ||
          userInfo.role === "EDUCATOR") && (
          <button
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => {
              setIsOptionOpen((prev) => !prev);
            }}
          >
            <img src="/moreOptionsHorizonButton.png" className="" />
          </button>
        )}
      {isOptionOpen && !editingMode && (
        <GroupWallOptions
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          disabled={isDeletingWall || isEditingWall || editingMode}
        />
      )}

      {editingMode && (
        <div className="absolute top-4 right-4">
          <div className="bg-white rounded-t-xl py-[2px] border-[2px] border-solid border-[#DDDDDD]">
            <button
              type="button"
              onClick={() => {
                handleUpdate(editedContent.trim());
              }}
              disabled={isEditingWall || editedContent.trim().length === 0}
              className="cursor-pointer w-full text-left disabled:opacity-60"
            >
              <span className="text-xs px-2 text-[#F05460]">
                {isEditingWall ? "저장 중..." : "저장"}
              </span>
            </button>
          </div>
          <div className="bg-white py-[2px] rounded-b-xl border-[2px] border-t-[0px] border-solid border-[#DDDDDD]">
            <button
              type="button"
              className="cursor-pointer w-full text-left"
              onClick={() => {
                setEditedContent(wallInfo.content);
                setEditingMode(false);
                setIsOptionOpen(false);
              }}
              disabled={isEditingWall}
            >
              <span className="text-xs px-2 text-[#666666]">취소</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupWallItem;
