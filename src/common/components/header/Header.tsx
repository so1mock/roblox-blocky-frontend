import { HeaderButton } from "./HeaderButton";

export default function Header() {
  return (
    <header className="relative flex items-center bg-rbPurple text-white p-2 min-w-[600px]">
      <img src="/LuaBlock_logo.png" className="z-10" />
      <nav className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4  min-w-[320px]">
        <HeaderButton to="/project" name="만들기" />
        <HeaderButton to="/tutorial" name="튜토리얼" />
        <HeaderButton to="/about" name="소개" />
        <HeaderButton to="/signup" name="회원가입" />
        <HeaderButton to="/login" name="로그인" />
      </nav>
    </header>
  );
}
// 5%
