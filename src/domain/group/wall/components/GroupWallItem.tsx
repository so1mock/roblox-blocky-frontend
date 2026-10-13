import { formatIsoStringToDate } from "@common/utils/formatIsoStringToDate";
import GroupWallOptions from "./GroupWallOptions";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError } from "@common/apis/ApiError";
import type { WallInfo } from "../types/wall";
import { useAuthStore } from "@user/stores/authStore";
import { useDeleteWallMutation } from "../hooks/useDeleteWallMutation";
import { useEditWallMutation } from "../hooks/useEditWallMutation";
import { wallMessageSchema, type WallMessageForm } from "../constants/schema";

function GroupWallItem({
  wallInfo,
  groupId,
}: {
  wallInfo: WallInfo;
  groupId: string;
}) {
  const { userInfo } = useAuthStore();
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const { mutateAsync: deleteWallMutation, isPending: isDeletingWall } =
    useDeleteWallMutation(groupId);
  const { mutateAsync: editWallMutation } = useEditWallMutation(groupId);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<WallMessageForm>({
    resolver: zodResolver(wallMessageSchema),
    defaultValues: { content: wallInfo.content },
  });

  // 편집 모드로 들어갈 때마다 원래 내용으로 되돌리고 전체 선택한다
  useEffect(() => {
    if (!editingMode) return;
    reset({ content: wallInfo.content });
    setFocus("content", { shouldSelect: true });
  }, [editingMode, wallInfo.content, reset, setFocus]);

  const handleDelete = async () => {
    if (isDeletingWall) return;
    await deleteWallMutation(wallInfo.uuid);
  };

  const handleEdit = () => {
    setIsOptionOpen(false);
    setEditingMode(true);
  };

  const closeEditing = () => {
    setEditingMode(false);
    setIsOptionOpen(false);
  };

  const handleUpdate = async ({ content }: WallMessageForm) => {
    try {
      await editWallMutation({ uuid: wallInfo.uuid, content });
      closeEditing();
    } catch (error) {
      setError("root", {
        message:
          error instanceof ApiError ? error.message : "수정에 실패했습니다.",
      });
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
          {editingMode ? (
            <>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                disabled={isSubmitting}
                {...register("content")}
              />
              {(errors.content || errors.root) && (
                <span className="text-sm text-red-600">
                  {errors.content?.message ?? errors.root?.message}
                </span>
              )}
            </>
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
          disabled={isDeletingWall || isSubmitting || editingMode}
        />
      )}

      {editingMode && (
        <div className="absolute top-4 right-4">
          <div className="bg-white rounded-t-xl py-[2px] border-[2px] border-solid border-[#DDDDDD]">
            <button
              type="button"
              onClick={handleSubmit(handleUpdate)}
              disabled={isSubmitting}
              className="cursor-pointer w-full text-left disabled:opacity-60"
            >
              <span className="text-xs px-2 text-[#F05460]">
                {isSubmitting ? "저장 중..." : "저장"}
              </span>
            </button>
          </div>
          <div className="bg-white py-[2px] rounded-b-xl border-[2px] border-t-[0px] border-solid border-[#DDDDDD]">
            <button
              type="button"
              className="cursor-pointer w-full text-left"
              onClick={closeEditing}
              disabled={isSubmitting}
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
