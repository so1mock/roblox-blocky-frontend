interface SpinnerProps {
  /** 안내 문구. 생략하면 아이콘만 보여준다 */
  label?: string;
  size?: "sm" | "md";
}

const SIZE_CLASS = {
  sm: "h-5 w-5",
  md: "h-8 w-8",
} as const;

function Spinner({ label, size = "md" }: SpinnerProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-10"
      role="status"
      aria-live="polite"
    >
      <svg
        className={`animate-spin text-rbPrimaryColor ${SIZE_CLASS[size]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      {label && <span className="text-sm text-gray-500">{label}</span>}
    </div>
  );
}

export default Spinner;
