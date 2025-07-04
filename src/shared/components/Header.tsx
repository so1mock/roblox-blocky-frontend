import { HeaderButton } from "./HeaderButton";

export function Header() {
  return (
    <header className="flex flex-row bg-[#9D7CDE] h-12">
      <img src="/LuaBlock_logo.png" />

      <nav className="flex-1 flex justify-center p-2 space-x-4 ">
        {/* 페이지 이름은 아직 완벽히 정하지 않음 */}
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
