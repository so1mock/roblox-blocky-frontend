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

      localStorage.setItem("access_token", data.auth.accessToken);
      localStorage.setItem("user_info", JSON.stringify(data.info));

      navigate({ to: "/" });
    },
    onError: (error: Error) => {
      alert("Mutation 에러" + error);
    },
  });

  useEffect(() => {
    if (code) {
      handleGetToken(code);
    }
  }, []);

  return <div> Redirecting...</div>;
}
