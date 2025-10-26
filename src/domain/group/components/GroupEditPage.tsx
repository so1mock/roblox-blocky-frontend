import { useEffect, useRef, useState } from "react";
import GroupNav from "./GroupNav";
import { useAuthStore } from "@user/stores/authStore";
import { useGroupDetailQuery } from "../hooks/useGroupDetailQuery";
import { useNavigate } from "@tanstack/react-router";
import type { GroupSummary } from "../types/group";
import { useEditGroupMutation } from "../hooks/useEditGroupMutation";

function GroupEditPage({ id }: { id: string }) {
  const navigate = useNavigate();
  const { userInfo } = useAuthStore();
  const {
    data: groupInfo,
    isLoading: isGroupInfoLoading,
    isError: isGroupInfoError,
    error: groupInfoError,
  } = useGroupDetailQuery(id);
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputDescriptionRef = useRef<HTMLTextAreaElement>(null);

  // 이미지 업로드 상태
  const [groupImage, setGroupImage] = useState<string>("/imgProfile.png");

  // 수정될 정보
  const [editedGroupInformation, setEditedGroupInformation] =
    useState<GroupSummary>({
      uuid: "",
      name: "",
      description: "",
      iconSrc: undefined,
    });

  // 편집 모드 상태
  const [isEditingMode, setIsEditingMode] = useState({
    name: false,
    description: false,
  });
  const { mutateAsync: editGroupMutation, isPending: isEditingGroup } =
    useEditGroupMutation(id);

  useEffect(() => {
    if (groupInfo === undefined) {
      return;
    }
    setEditedGroupInformation(groupInfo.groupSummary);
  }, [groupInfo]);

  useEffect(() => {
    if (isEditingMode.name && inputNameRef.current) {
      inputNameRef.current.focus();
      inputNameRef.current.select();
    }

    if (isEditingMode.description && inputDescriptionRef.current) {
      inputDescriptionRef.current.focus();
      inputDescriptionRef.current.select();
    }
  }, [isEditingMode]);

  // 이미지 선택
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setGroupImage(URL.createObjectURL(file)); // 선택한 이미지 바로 표시
    }
  };

  // 이름 수정 취소
  const handleCancelName = () => {
    if (groupInfo === undefined) {
      return;
    }
    setEditedGroupInformation(groupInfo.groupSummary);
    setIsEditingMode((prev) => ({
      ...prev,
      name: false,
    }));
  };

  // 설명 수정 취소
  const handleCancelDescription = () => {
    if (groupInfo === undefined) {
      return;
    }
    setEditedGroupInformation(groupInfo.groupSummary);
    setIsEditingMode((prev) => ({
      ...prev,
      description: false,
    }));
  };

  // changeevent 연결
  const handleChangeGroupInformation = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEditedGroupInformation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditGroup = async (fieldName: "name" | "description") => {
    if (isEditingGroup) {
      return;
    }

    await editGroupMutation(editedGroupInformation);
    setIsEditingMode((prev) => ({
      ...prev,
      [fieldName]: false,
    }));
  };

  if (isGroupInfoError) {
    alert("유효하지 않은 반입니다. " + groupInfoError.message);
    navigate({
      to: `/${userInfo?.role === "EDUCATOR" ? "teacher" : "student"}/group`,
    });
    return null;
  }

  return (
    <div className="w-[1600px] mx-auto flex justify-center gap-24">
      {userInfo?.role === "EDUCATOR" && <GroupNav id={id} />}
      {isGroupInfoLoading || groupInfo === undefined ? (
        <div>Loading...</div>
      ) : (
        <div className="w-[1200px] flex flex-col items-center gap-12">
          {/* 이미지 업로드 */}
          <div className="flex flex-col items-center gap-4">
            <img
              src={groupImage}
              alt="그룹 이미지"
              className="w-36 h-36 object-cover rounded-2xl border border-gray-200"
            />
            <label className="px-3 py-2 bg-white text-rbPrimaryColor rounded-3xl cursor-pointer">
              이미지 선택
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* 반 정보 */}
          <div className="flex flex-col gap-12 bg-white px-8 py-12 rounded-2xl w-[1100px]">
            {/* 반 이름 */}
            <div className="flex flex-col gap-2 w-full">
              <span className="font-bold text-2xl">반 이름</span>
              {isEditingMode.name ? (
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={editedGroupInformation.name}
                    name="name"
                    onChange={handleChangeGroupInformation}
                    className="border border-gray-300 rounded-xl px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-rbPrimaryColor"
                    ref={inputNameRef}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleEditGroup("name"); // 저장
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      handleEditGroup("name");
                    }}
                    className="px-3 py-2 bg-rbPrimaryColor text-white rounded-2xl cursor-pointer"
                  >
                    저장
                  </button>
                  <button
                    onClick={handleCancelName}
                    className="px-3 py-2 bg-gray-300 text-black rounded-2xl cursor-pointer"
                  >
                    취소
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <span>{groupInfo.groupSummary.name}</span>
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      setIsEditingMode((prev) => ({
                        ...prev,
                        name: true,
                      }));
                    }}
                  >
                    <img src="/btnEdit.png" />
                  </button>
                </div>
              )}
            </div>

            <hr className="bg-gray-300 h-[1px] border-0" />

            {/* 반 설명 */}
            <div className="flex flex-col gap-2 w-full">
              <span className="font-bold text-2xl">반 설명</span>
              {isEditingMode.description ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={editedGroupInformation.description}
                    name="description"
                    onChange={handleChangeGroupInformation}
                    rows={4}
                    className="border border-gray-300 rounded-xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-rbPrimaryColor"
                    ref={inputDescriptionRef}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        handleEditGroup("description");
                      }}
                      className="px-3 py-2 bg-rbPrimaryColor text-white rounded-2xl cursor-pointer"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleEditGroup("description"); // 저장
                        }
                      }}
                    >
                      저장
                    </button>
                    <button
                      onClick={handleCancelDescription}
                      className="px-3 py-2 bg-gray-300 text-black rounded-2xl cursor-pointer"
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <span>{groupInfo.groupSummary.description}</span>
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      setIsEditingMode((prev) => ({
                        ...prev,
                        description: true,
                      }));
                    }}
                  >
                    <img src="/btnEdit.png" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupEditPage;
