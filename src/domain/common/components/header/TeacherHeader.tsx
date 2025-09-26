import { useAuthStore } from "@user/stores/authStore";
import { Link } from "@tanstack/react-router";
import { LinkNavButton } from "./LinkNavButton";
import { ProfileButton } from "@user/components/ProfileButton";
import { SocialLoginButton } from "@user/components/SocialLoginButton";

export function TeacherHeader() {
  const { isLogin, userInfo } = useAuthStore();
  return (
    <header className="relative flex items-center bg-rbBg p-2 pr-5 min-w-[800px] justify-center m-4 rounded-xl">
      <Link to="/teacher" className="absolute left-2">
        <img src="/coblocksLogo.png" />
      </Link>

      <nav className="flex gap-12 justify-center">
        <LinkNavButton to="/teacher/group" title="반" />
        <LinkNavButton to="/teacher/resources" title="자료실" />
        <LinkNavButton to="/teacher/about" title="소개" />
        <LinkNavButton to="/teacher/inquiry" title="문의" />
        <LinkNavButton to="/teacher/payment" title="결제" />
      </nav>

      {isLogin ? (
        <ProfileButton
          className={"absolute right-5"}
          nickname={userInfo?.nickname}
        />
      ) : (
        <SocialLoginButton className={"absolute right-5"} />
      )}
    </header>
  );
}
