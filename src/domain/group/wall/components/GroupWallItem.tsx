import { formatIsoStringToDate } from "@common/utils/formatIsoStringToDate";
import GroupWallOptions from "./GroupWallOptions";
import { useEffect, useRef, useState } from "react";
import type { WallInfo } from "../types/wall";
import { useAuthStore } from "@user/stores/authStore";
import { deleteWall, updateWall } from "../apis/wall";

function GroupWallItem({
  wallInfo,
  onChanged,
}: {
  wallInfo: WallInfo;
  onChanged: () => Promise<void> | void;
}) {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>(wallInfo.content);
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);
  const { userInfo } = useAuthStore();

  useEffect(() => {
    if (isEditing) {
      setEditedContent(wallInfo.content);
      if (editTextareaRef.current) {
        editTextareaRef.current.focus();
        editTextareaRef.current.select();
      }
    }
  }, [isEditing, wallInfo.content]);

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await deleteWall(wallInfo.uuid);
      await onChanged();
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      alert("삭제에 실패했습니다." + message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    setIsOptionOpen(false);
    setIsEditing(true);
  };

  const handleUpdate = async (content: string) => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      await updateWall({ messageUuid: wallInfo.uuid, content });
      await onChanged();
      setIsEditing(false);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      alert("수정에 실패했습니다." + message);
    } finally {
      setIsUpdating(false);
    }
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
          {isEditing ? (
            <textarea
              ref={editTextareaRef}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              value={editedContent}
              disabled={isUpdating}
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
      {isOptionOpen && !isEditing && (
        <GroupWallOptions
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          disabled={isDeleting || isUpdating || isEditing}
        />
      )}

      {isEditing && (
        <div className="absolute top-4 right-4">
          <div className="bg-white rounded-t-xl py-[2px] border-[2px] border-solid border-[#DDDDDD]">
            <button
              type="button"
              onClick={() => {
                handleUpdate(editedContent.trim());
              }}
              disabled={isUpdating || editedContent.trim().length === 0}
              className="cursor-pointer w-full text-left disabled:opacity-60"
            >
              <span className="text-xs px-2 text-[#F05460]">
                {isUpdating ? "저장 중..." : "저장"}
              </span>
            </button>
          </div>
          <div className="bg-white py-[2px] rounded-b-xl border-[2px] border-t-[0px] border-solid border-[#DDDDDD]">
            <button
              type="button"
              className="cursor-pointer w-full text-left"
              onClick={() => {
                setEditedContent(wallInfo.content);
                setIsEditing(false);
                setIsOptionOpen(false);
              }}
              disabled={isUpdating}
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
