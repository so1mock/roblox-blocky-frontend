import { Link } from "@tanstack/react-router";
import { LinkNavButton } from "./LinkNavButton";

export function Header() {
  return (
    <header className="relative flex items-center bg-rbBg p-2 pr-5 min-w-[800px] justify-center m-4 rounded-xl">
      <Link to="/" className="absolute left-2">
        <img src="/coblocksLogo.png" />
      </Link>

      <nav className="flex gap-12 justify-center">
        <LinkNavButton to="/about" title="소개" />
      </nav>
    </header>
  );
}
