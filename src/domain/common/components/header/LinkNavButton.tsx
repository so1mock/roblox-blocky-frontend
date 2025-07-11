import { Link } from "@tanstack/react-router";

export function LinkNavButton({ to, title }: { to: string; title: string }) {
  return (
    <div className="text-white flex items-center whitespace-nowrap h-10 w-15 justify-center">
      <Link to={to}>{title}</Link>
    </div>
  );
}
