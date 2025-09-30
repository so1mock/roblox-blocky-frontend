function Button({
  text,
  handleButtonClick,
}: {
  text: string;
  handleButtonClick: () => void;
}) {
  return (
    <button
      onClick={handleButtonClick}
      className="
        transition-all duration-200
        hover:text-rbHoverText
        hover:bg-rbPointColor
        px-4 py-2
        rounded-xl
        cursor-pointer
        mr-2
      "
    >
      {text}
    </button>
  );
}

export default Button;
