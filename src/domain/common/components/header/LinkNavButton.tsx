import { Link } from "@tanstack/react-router";

export function LinkNavButton({
  to,
  title,
  href,
}: {
  to: string;
  title: string;
  href?: boolean;
}) {
  if (href) {
    return (
      <button
        onClick={() => {
          window.location.href = to;
        }}
        className="inline-block text-white text-center whitespace-nowrap h-10 w-15 leading-10 cursor-pointer"
      >
        {title}
      </button>
    );
  }

  return (
    <Link
      to={to}
      className="inline-block text-white text-center whitespace-nowrap h-10 w-15 leading-10"
    >
      {title}
    </Link>
  );
}
