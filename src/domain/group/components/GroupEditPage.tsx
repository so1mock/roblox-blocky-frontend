import { useEffect, useRef, useState } from "react";
import GroupNav from "./GroupNav";

function GroupEditPage({ id }: { id: string }) {
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputDescriptionRef = useRef<HTMLTextAreaElement>(null);

  // 이미지 업로드 상태
  const [groupImage, setGroupImage] = useState<string>("/imgProfile.png");

  // 반 이름/설명 상태
  const [groupName, setGroupName] = useState("연습 1반");
  const [groupDescription, setGroupDescription] = useState(
    "이 반은 기초 로블록스 학습을 위해 생성된 반입니다.",
  );

  // 임시 편집용 상태
  const [editName, setEditName] = useState(groupName);
  const [editDescription, setEditDescription] = useState(groupDescription);

  // 편집 모드 상태
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

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
  const handleSaveName = () => {
    setGroupName(editName);
    setIsEditingName(false);
    // TODO: API 요청으로 서버 저장
  };

  const handleCancelName = () => {
    setEditName(groupName);
    setIsEditingName(false);
  };

  const handleSaveDescription = () => {
    setGroupDescription(editDescription);
    setIsEditingDescription(false);
    // TODO: API 요청으로 서버 저장
  };
  const handleCancelDescription = () => {
    setEditDescription(groupDescription);
    setIsEditingDescription(false);
  };

  return (
    <div className="w-[1600px] mx-auto flex justify-center gap-24">
      <GroupNav id={id} />

      <div className="flex flex-col items-center gap-12">
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
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
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
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
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
