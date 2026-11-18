function Button({
  text,
  handleButtonClick,
  xSize = 4, // 기본값 px-4
  ySize = 1, // 기본값 py-1
  disabled = false,
  type = "button",
}: {
  text: string;
  // type 이 "submit" 이면 폼이 제출을 처리하므로 생략할 수 있다
  handleButtonClick?: () => void | Promise<void>;
  xSize?: number;
  ySize?: number;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleButtonClick}
      className="bg-rbPrimaryColor rounded-2xl cursor-pointer disabled:opacity-60"
      style={{
        padding: `${ySize * 0.25}rem ${xSize * 0.25}rem`,
      }}
    >
      <span className="text-white">{text}</span>
    </button>
  );
}

export default Button;
