import {
  createFileRoute,
  useSearch,
  useNavigate,
  redirect,
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
  beforeLoad: async ({ search }: { search: SearchParams }) => {
    const hasAny = search.code || search.state || search.error;
    if (!hasAny) {
      alert("올바르지 않은 접근입니다."); // 쿼리 파라미터가 하나도 없는 경우
      throw redirect({ to: "/" });
    }
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
    } else if (code) {
      handleLogin(code);
    }
    navigate({ to: "/" });
  }, [code, error]);
  return <div> Redirecting...</div>;
}
