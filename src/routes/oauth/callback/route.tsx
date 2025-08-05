import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import {
  getToken,
  type GetTokenResponse,
} from "../../../domain/user/apis/getToken";
import { useEffect } from "react";
import { api } from "../../../domain/common/apis/axios";

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

  const { mutate: handleGetToken } = useMutation({
    mutationFn: getToken,
    onSuccess: (data: GetTokenResponse) => {
      console.log("토큰 발급 성공" + JSON.stringify(data));
      api.defaults.headers.common["Authorization"] = data.auth.accessToken;
      localStorage.setItem("user_info", JSON.stringify(data.info));

      navigate({ to: "/" });
    },
    onError: (error: Error) => {
      alert("서비스 사용자 인증 에러" + error);
    },
  });

  useEffect(() => {
    if (error) {
      alert("로블록스 로그인에서 에러 발생: " + error.message);
      navigate({ to: "/" });
    } else if (code) {
      handleGetToken(code);
    }
  }, []);

  return <div> Redirecting...</div>;
}
