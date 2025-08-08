import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { useUser } from "../../../domain/user/hooks/useUser";
import { getUserInfo } from "../../../domain/user/apis/user";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  useEffect(() => {
    if (error) {
      alert("로블록스 로그인에서 에러 발생: " + error.message);
      navigate({ to: "/" });
    } else if (code) {
      handleLogin.mutateAsync(code).then(() => {
        console.log("로그인 성공");
        // 토큰 세팅이 onSuccess 안에서 끝난 다음에 실행되도록
        // mutateAsync가 onSuccess 끝나기 전 resolve될 수도 있으므로 setTimeout 같은 미세 지연 추가 가능
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ["user"] });
          queryClient.refetchQueries({ queryKey: ["user"] });
          console.log("invalidate + refetch 성공");
          navigate({ to: "/" });
        }, 0);
      });
    }
  }, [code, error]);
  return <div> Redirecting...</div>;
}
