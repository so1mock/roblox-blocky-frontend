import { LinkNavButton } from "./LinkNavButton";
import { Link } from "@tanstack/react-router";
import { SocialLoginButton } from "../../../User/components/SocialLoginButton";

export function Header() {
  return (
    <header className="relative flex items-center bg-rbSurface p-2 pr-5 min-w-[800px] justify-center">
      <Link to="/" className="absolute left-2">
        <img src="/LuaBlock_logo.png" />
      </Link>

      <nav className="flex gap-12 justify-center">
        <LinkNavButton to="/project" title="만들기" href={true} />
        <LinkNavButton to="/tutorial" title="튜토리얼" />
        <LinkNavButton to="/about" title="소개" />
      </nav>

      <SocialLoginButton className="absolute right-5" />
    </header>
  );
}
