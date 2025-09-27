import { Link } from "@tanstack/react-router";

export function LinkNavButton({ to, title }: { to: string; title: string }) {
  return (
    <Link
      to={to}
      className="inline-block text-rbText font-bold  text-center whitespace-nowrap h-10 leading-10"
    >
      {title}
    </Link>
  );
}
