import { useAuthStore } from "@user/stores/authStore";
import { Link } from "@tanstack/react-router";
import { LinkNavButton } from "./LinkNavButton";
import Button from "../Button";

export function TeacherHeader() {
  const { isLogin, userInfo } = useAuthStore();
  return (
    <header className="relative flex items-center bg-rbBackground p-2 pr-5 justify-center m-4 rounded-xl">
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
        <span className="absolute right-5 flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-green-500 text-rbHoverText font-semibold shadow-md transition-transform duration-200 hover:scale-105">
          {userInfo?.nickname}님 반갑습니다 🎉
        </span>
      ) : (
        <div className="absolute right-5">
          <Button
            text="로그인"
            handleButtonClick={() => {
              console.log("로그인");
            }}
          />
          <Button
            text="회원가입"
            handleButtonClick={() => {
              console.log("회원가입");
            }}
          />
        </div>
      )}
    </header>
  );
}
