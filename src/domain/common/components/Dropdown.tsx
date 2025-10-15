import { useState } from "react";

interface DropdownOption {
  key: string;
  name: string;
}

interface DropdownProps {
  options: DropdownOption[];
  selected: DropdownOption;
  onChange: (option: DropdownOption) => void;
  width?: string; // 예: "w-[180px]" 대신 사용자 정의 가능
}

export default function Dropdown({
  options,
  selected,
  onChange,
  width = "w-[180px]",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${width}`}>
      {/* 선택된 옵션 버튼 */}
      <button
        className="w-full px-4 py-3 bg-white rounded-2xl cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selected.name}</span>
        <div>
          <img
            src="/dropdown.png"
            className={`w-4 transform transition-transform duration-200 ${
              isOpen ? "-rotate-90" : "rotate-0"
            }`}
          />
        </div>
      </button>

      {/* 옵션 메뉴 */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl border border-gray-300 shadow-lg z-10">
          {options
            .filter((option) => option.key !== selected.key)
            .map((option, idx, arr) => (
              <button
                key={option.key}
                className={`
                  w-full px-4 py-3 text-left cursor-pointer flex justify-between items-center
                  hover:bg-gray-100
                  ${idx === 0 ? "rounded-t-2xl" : ""}
                  ${idx === arr.length - 1 ? "rounded-b-2xl" : ""}
                `}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                <span>{option.name}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
