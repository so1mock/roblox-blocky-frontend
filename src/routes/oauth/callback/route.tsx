import {
  createFileRoute,
  useSearch,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { useUser } from "@user/hooks/useUser";

type SearchParams = {
  code?: string;
  state?: string;
  error?: Error;
};

export const Route = createFileRoute("/oauth/callback")({
  component: RouteComponent,
  validateSearch: (search): SearchParams => {
    return {
      code: search.code as string,
      state: search.state as string,
      error: search.error as Error,
    };
  },
});

export function RouteComponent() {
  const { code, error } = useSearch({ from: "/oauth/callback" });
  const navigate = useNavigate();
  const { handleLogin } = useUser();

  // RouteComponent 내 useEffect 예시
  useEffect(() => {
    if (error) {
      alert("로블록스 로그인에서 에러 발생: " + error.message);
      navigate({ to: "/" });
    } else if (code) {
      handleLogin(code);
    }
  }, [code, error]);
  return <div> Redirecting...</div>;
}
