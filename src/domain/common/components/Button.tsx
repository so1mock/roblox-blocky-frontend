function Button({
  text,
  handleButtonClick,
  xSize = 4, // 기본값 px-4
  ySize = 1, // 기본값 py-1
}: {
  text: string;
  handleButtonClick: () => void | Promise<void>;
  xSize?: number;
  ySize?: number;
}) {
  return (
    <button
      type="button"
      onClick={handleButtonClick}
      className="bg-rbPrimaryColor rounded-2xl cursor-pointer"
      style={{
        padding: `${ySize * 0.25}rem ${xSize * 0.25}rem`,
      }}
    >
      <span className="text-white">{text}</span>
    </button>
  );
}

export default Button;
