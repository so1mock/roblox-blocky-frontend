import { Link } from "@tanstack/react-router";

export function HeaderButton({ to, name }: { to: string; name: string }) {
  return <Link to={to}>{name}</Link>;
}
