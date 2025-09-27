import { useAuthStore } from "@user/stores/authStore";
import { Link } from "@tanstack/react-router";
import { LinkNavButton } from "./LinkNavButton";
import { StudentProfileButton } from "@user/components/StudentProfileButton";
import { SocialLoginButton } from "@user/components/SocialLoginButton";

export function StudentHeader() {
  const { isLogin, userInfo } = useAuthStore();
  return (
    <header className="relative flex items-center bg-rbBackground p-2 pr-5 min-w-[800px] justify-center m-4 rounded-xl">
      <Link to="/student" className="absolute left-2">
        <img src="/coblocksLogo.png" />
      </Link>

      <nav className="flex gap-12 justify-center">
        <LinkNavButton to="/student/my-places" title="내 플레이스로" />
        <LinkNavButton to="/student/about" title="소개" />
      </nav>

      {isLogin ? (
        <StudentProfileButton
          className={"absolute right-5"}
          nickname={userInfo?.nickname}
        />
      ) : (
        <SocialLoginButton className={"absolute right-5"} />
      )}
    </header>
  );
}
