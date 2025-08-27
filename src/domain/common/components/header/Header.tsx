import { useAuthStore } from "@user/stores/authStore";
import { Link } from "@tanstack/react-router";
import { LinkNavButton } from "./LinkNavButton";
import { ProfileButton } from "@user/components/ProfileButton";
import { SocialLoginButton } from "@user/components/SocialLoginButton";

export function Header() {
  const { isLogin, userInfo } = useAuthStore();
  return (
    <header className="relative flex items-center bg-rbSurface p-2 pr-5 min-w-[800px] justify-center">
      <Link to="/" className="absolute left-2">
        <img src="/LuaBlock_logo.png" />
      </Link>

      <nav className="flex gap-12 justify-center">
        <LinkNavButton to="/blockCoding" title="만들기" />
        <LinkNavButton to="/tutorial" title="튜토리얼" />
        <LinkNavButton to="/about" title="소개" />
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
