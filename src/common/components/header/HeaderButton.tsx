import { Link } from "@tanstack/react-router";
//  text-white items-center p-2 justify-between

export function HeaderButton({ to, name }: { to: string; name: string }) {
  return (
    <Link to={to} className="flex items-center text-white h-full">
      {name}
    </Link>
  );
}
