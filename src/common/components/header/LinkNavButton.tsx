import { Link } from "@tanstack/react-router";
//  text-white items-center p-2 justify-between

export function LinkNavButton({ to, title }: { to: string; title: string }) {
  return (
    <Link to={to} className="flex items-center text-white h-full">
      {title}
    </Link>
  );
}
