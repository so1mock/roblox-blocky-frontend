import { Link } from "@tanstack/react-router";

export function LinkNavButton({ to, title }: { to: string; title: string }) {
  return (
    <Link
      to={to}
      className="text-white flex items-center whitespace-nowrap h-10"
    >
      {title}
    </Link>
  );
}
