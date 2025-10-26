import { useNavigate, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useDeleteGroupMutation } from "../hooks/useDeleteGroupMutation";

function GroupNav({ id }: { id: string }) {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 가져오기
  const menuOptions = [
    {
      name: "반 상세보기",
      icon: "/expandCircleRight.png",
      to: `/teacher/group/${id}`,
      key: "",
    },
    {
      name: "정보 수정",
      icon: "/expandCircleRight.png",
      to: `/teacher/group/${id}/information`,
      key: "information",
    },
    {
      name: "학생 플레이스 관리",
      icon: "/expandCircleRight.png",
      to: `/teacher/group/${id}/place`,
      key: "place",
    },
    {
      name: "회원 관리",
      icon: "/expandCircleRight.png",
      to: `/teacher/group/${id}/user`,
      key: "user",
    },
  ];

  const { mutateAsync: deleteGroupMutation, isPending: isDeletingGroup } =
    useDeleteGroupMutation();
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);

  const handleGroupDelete = async () => {
    if (isDeletingGroup) return;
    if (!confirm("정말 반을 삭제하시겠습니까?")) return;

    await deleteGroupMutation(id);
    navigate({ to: "/teacher/group" });
  };

  // URL 경로 변경 시 활성 메뉴 갱신
  useEffect(() => {
    const segments = location.pathname.split("/").filter(Boolean); // ["teacher","group","2","information"]
    const lastSegment = segments[segments.length - 1]; // "information"

    const activeIndex = menuOptions.findIndex(
      (option) => option.key === lastSegment,
    );
    setSelectedOptionIndex(activeIndex === -1 ? 0 : activeIndex);
  }, [location.pathname]);

  return (
    <nav className="flex flex-col gap-8">
      <div className="flex flex-col">
        {menuOptions.map((option, index, arr) => {
          const isActive = index === selectedOptionIndex;

          return (
            <button
              key={option.name}
              onClick={() => navigate({ to: option.to })}
              className={`
                flex items-center text-left text-lg px-6 py-4 cursor-pointer transition
                border-2 border-rbPrimaryColor
                ${index !== 0 ? "border-t-0" : "rounded-tr-2xl"}
                ${index === arr.length - 1 ? "rounded-br-2xl" : ""}
                ${isActive ? "bg-rbPrimaryColor text-white" : "bg-white text-[#888888] hover:bg-gray-50"}
              `}
            >
              <span className="flex-1">{option.name}</span>
              {option.icon && (
                <img
                  src={option.icon}
                  className={`pl-8 transition-transform duration-200 ${isActive ? "translate-x-1" : ""}`}
                />
              )}
            </button>
          );
        })}
      </div>

      <button
        className="flex items-center justify-center bg-white rounded-2xl cursor-pointer border-2 border-rbPointColor hover:bg-gray-50 transition"
        onClick={handleGroupDelete}
      >
        <img src="/trashcan.png" className="pl-4" />
        <span className="text-left text-rbPointColor px-6 py-4 text-lg flex-1 font-bold">
          반 삭제하기
        </span>
      </button>
    </nav>
  );
}

export default GroupNav;
