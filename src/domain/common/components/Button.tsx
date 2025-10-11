function Button({
  text,
  handleButtonClick,
}: {
  text: string;
  handleButtonClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={handleButtonClick}
      className="bg-rbPrimaryColor rounded-2xl px-4 py-1 cursor-pointer"
    >
      <span className="text-white">{text}</span>
    </button>
  );
}

export default Button;
