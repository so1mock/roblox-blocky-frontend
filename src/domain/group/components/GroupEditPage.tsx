import { useEffect, useRef, useState } from "react";
import GroupNav from "./GroupNav";
import { useAuthStore } from "@user/stores/authStore";
import type { GroupSummary } from "../types/group";
import { updateGroupInfo } from "../apis/group";

function GroupEditPage({ groupSummary }: { groupSummary: GroupSummary }) {
  const { userInfo } = useAuthStore();
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputDescriptionRef = useRef<HTMLTextAreaElement>(null);

  // 이미지 업로드 상태
  const [groupImage, setGroupImage] = useState<string>("/imgProfile.png");

  const [groupName, setGroupName] = useState(groupSummary.name);
  const [groupDescription, setGroupDescription] = useState(
    groupSummary.description,
  );
  const [editedName, setEditedName] = useState(groupName);
  const [editedDescription, setEditedDescription] = useState(groupDescription);

  // 편집 모드 상태
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [isUpdatingDescription, setIsUpdatingDescription] = useState(false);

  useEffect(() => {
    if (isEditingName && inputNameRef.current) {
      inputNameRef.current.focus();
      inputNameRef.current.select();
    }
  }, [isEditingName]);

  useEffect(() => {
    if (isEditingDescription && inputDescriptionRef.current) {
      inputDescriptionRef.current.focus();
      inputDescriptionRef.current.select();
    }
  }, [isEditingDescription]);

  // 이미지 선택
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setGroupImage(URL.createObjectURL(file)); // 선택한 이미지 바로 표시
    }
  };

  // 저장/취소 핸들러
  const handleSaveName = async () => {
    if (isUpdatingName) return;
    setIsUpdatingName(true);

    try {
      await updateGroupInfo({
        uuid: groupSummary.uuid,
        name: editedName,
        description: groupDescription,
      });
      setGroupName(editedName);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setGroupName(message);
      setEditedName(message);
    } finally {
      setIsEditingName(false);
      setIsUpdatingName(false);
    }
  };

  const handleSaveDescription = async () => {
    if (isUpdatingDescription) return;
    setIsUpdatingDescription(true);
    try {
      await updateGroupInfo({
        uuid: groupSummary.uuid,
        name: groupName,
        description: editedDescription,
      });
      setGroupDescription(editedDescription);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setGroupDescription(message);
      setEditedDescription(message);
    } finally {
      setIsEditingDescription(false);
      setIsUpdatingDescription(false);
    }
  };

  const handleCancelName = () => {
    setEditedName(groupSummary.name);
    setIsEditingName(false);
  };

  const handleCancelDescription = () => {
    setEditedDescription(groupDescription);
    setIsEditingDescription(false);
  };

  return (
    <div className="w-[1600px] mx-auto flex justify-center gap-24">
      {userInfo?.role === "EDUCATOR" && <GroupNav id={groupSummary.uuid} />}

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
            {isEditingName ? (
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="border border-gray-300 rounded-xl px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-rbPrimaryColor"
                  ref={inputNameRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveName(); // 저장
                    }
                  }}
                />
                <button
                  onClick={handleSaveName}
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
                <span>{groupName}</span>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setIsEditingName(true);
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
            {isEditingDescription ? (
              <div className="flex flex-col gap-2">
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  rows={4}
                  className="border border-gray-300 rounded-xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-rbPrimaryColor"
                  ref={inputDescriptionRef}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveDescription}
                    className="px-3 py-2 bg-rbPrimaryColor text-white rounded-2xl cursor-pointer"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSaveDescription(); // 저장
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
                <span>{groupDescription}</span>
                <button
                  className="cursor-pointer"
                  onClick={() => setIsEditingDescription(true)}
                >
                  <img src="/btnEdit.png" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupEditPage;
