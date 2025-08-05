import { LinkNavButton } from "./LinkNavButton";
import { Link } from "@tanstack/react-router";
import { SocialLoginButton } from "../../../user/components/SocialLoginButton";
import { useUser } from "../../../user/hooks/useUser";

export function Header() {
  const { isLogin, userInfo } = useUser();
  return (
    <header className="relative flex items-center bg-rbSurface p-2 pr-5 min-w-[800px] justify-center">
      <Link to="/" className="absolute left-2">
        <img src="/LuaBlock_logo.png" />
      </Link>

      <nav className="flex gap-12 justify-center">
        <LinkNavButton to="/project" title="만들기" />
        <LinkNavButton to="/tutorial" title="튜토리얼" />
        <LinkNavButton to="/about" title="소개" />
      </nav>

      {isLogin ? (
        <span className="absolute right-5 text-white">
          {userInfo?.nickname}님 환영합니다
        </span>
      ) : (
        <SocialLoginButton className={"absolute right-5"} />
      )}
    </header>
  );
}
