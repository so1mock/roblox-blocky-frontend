import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { useUser } from "../../../domain/user/hooks/useUser.ts";

type SearchParams = {
  code?: string;
  state?: string;
  error?: string;
};

export const Route = createFileRoute("/oauth/callback")({
  component: RouteComponent,
  validateSearch: (search): SearchParams => {
    return {
      code: search.code as string,
      state: search.state as string,
      error: search.error as string,
    };
  },
});

export function RouteComponent() {
  const { code } = useSearch({ from: "/oauth/callback" });
  const { handleLogin } = useUser();

  useEffect(() => {
    if (code) {
      handleLogin(code);
    }
  }, []);

  return <div> Redirecting...</div>;
}
