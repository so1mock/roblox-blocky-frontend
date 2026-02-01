import { useUser } from "@user/hooks/useUser";
import { useAuthStore } from "@user/stores/authStore";

export function TeacherProfileButton() {
  const { handleLogout } = useUser();
  const { userInfo } = useAuthStore();
  return (
    <div className="absolute right-5 flex items-center gap-2">
      <span className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-green-500 text-rbHoverText font-semibold shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer">
        {userInfo?.nickname}님 반갑습니다 🎉
      </span>
      <button
        className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-200 hover:scale-105 cursor-pointer"
        onClick={() => {
          handleLogout();
        }}
      >
        로그아웃
      </button>
    </div>
  );
}
