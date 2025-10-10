import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

function GroupNav({ id }: { id: string }) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const navigate = useNavigate();
  const menuOptions = [
    {
      name: "반 상세보기",
      icon: "/expandCircleRight.png",
      to: `/teacher/group/${id}`,
    },
    {
      name: "정보 수정",
      icon: "/expandCircleRight.png",
      to: `/teacher/group/${id}/information`,
    },
    {
      name: "학생 플레이스 관리",
      icon: "/expandCircleRight.png",
      to: `/teacher/group/${id}/place`,
    },
    {
      name: "게시판 관리",
      icon: "/expandCircleRight.png",
      to: `/teacher/group/${id}/board`,
    },
    {
      name: "회원 관리",
      icon: "/expandCircleRight.png",
      to: `/teacher/group/${id}/user`,
    },
  ];

  return (
    <nav className="flex flex-col gap-8">
      <div className="flex flex-col">
        {menuOptions.map((option, index, arr) => {
          const isActive = index === selectedOptionIndex;

          return (
            <button
              key={option.name}
              onClick={() => {
                setSelectedOptionIndex(index);
                navigate({ to: option.to });
              }}
              className={`
                flex items-center text-left text-lg px-6 py-4 cursor-pointer transition
                border-2 border-rbPrimaryColor
                ${index !== 0 ? "border-t-0" : "rounded-tr-2xl"}
                ${index === arr.length - 1 ? "rounded-br-2xl" : ""}
                ${
                  isActive
                    ? "bg-rbPrimaryColor text-white"
                    : "bg-white text-[#888888] hover:bg-gray-50"
                }
              `}
            >
              <span className="flex-1">{option.name}</span>
              {option.icon && (
                <img
                  src={option.icon}
                  className={`pl-8 transition-transform duration-200 ${
                    isActive ? "translate-x-1" : ""
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      <button className="flex items-center justify-center bg-white rounded-2xl cursor-pointer border-2 border-rbPointColor hover:bg-gray-50 transition">
        <img src="/trashcan.png" className="pl-4" />
        <span className="text-left text-rbPointColor px-6 py-4 text-lg flex-1 font-bold">
          반 삭제하기
        </span>
      </button>
    </nav>
  );
}

export default GroupNav;
