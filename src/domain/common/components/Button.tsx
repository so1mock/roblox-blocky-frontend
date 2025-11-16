function Button({
  text,
  handleButtonClick,
  xSize = 4, // 기본값 px-4
  ySize = 1, // 기본값 py-1
  disabled = false,
}: {
  text: string;
  handleButtonClick: () => void | Promise<void>;
  xSize?: number;
  ySize?: number;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
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
