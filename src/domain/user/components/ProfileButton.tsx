import { useUser } from "@user/hooks/useUser";

export function ProfileButton({
  className = "",
  nickname = "",
}: {
  className: string;
  nickname?: string;
}) {
  const { handleLogout } = useUser();
  return (
    <button
      className={`flex items-center whitespace-nowrap gap-2 h-10 bg-rbLogin min-w-fit p-2 rounded-lg ${className}`}
      onClick={() => {
        handleLogout();
      }}
    >
      <img src="/profileIcon.png" className="w-7 h-7" />
      <div className="text-white">{nickname} 로그아웃</div>
    </button>
  );
}
