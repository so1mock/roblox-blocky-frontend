import { Link } from "@tanstack/react-router";
import { LinkNavButton } from "./LinkNavButton";
import { TeacherProfileButton } from "@user/components/TeacherProfileButton";

export function TeacherHeader() {
  return (
    <header className="relative flex items-center bg-rbBackground p-2 pr-5 justify-center m-4 rounded-xl">
      <Link to="/teacher" className="absolute left-2">
        <img src="/coblocksLogo.png" />
      </Link>

      <nav className="flex gap-12 justify-center">
        <LinkNavButton to="/teacher/group" title="반" />
        {/* <LinkNavButton to="/teacher/resources" title="자료실" /> */}
        <LinkNavButton to="/teacher/about" title="소개" />
        {/* <LinkNavButton to="/teacher/inquiry" title="문의" />
        <LinkNavButton to="/teacher/payment" title="결제" /> */}
      </nav>
      <TeacherProfileButton />
    </header>
  );
}
