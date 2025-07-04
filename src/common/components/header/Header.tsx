import { LinkNavButton } from "./LinkNavButton";

export function Header() {
  return (
    <header className="relative flex items-center bg-[#9D7CDE] text-white p-2 min-w-[600px]">
      <img src="/LuaBlock_logo.png" className="z-10" />

      <nav className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4  min-w-[320px]">
        <LinkNavButton to="/project" title="만들기" />
        <LinkNavButton to="/tutorial" title="튜토리얼" />
        <LinkNavButton to="/about" title="소개" />
        <LinkNavButton to="/signup" title="회원가입" />
        <LinkNavButton to="/login" title="로그인" />
      </nav>
    </header>
  );
}
// 5%
