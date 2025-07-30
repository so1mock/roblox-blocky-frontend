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
  const { code, state, error } = useSearch({ from: "/oauth/callback" });
  console.log(code, state, error);
  const navigate = useNavigate();

  const { mutate: handleGetToken } = useMutation({
    mutationFn: getToken,
    onSuccess: (data: GetTokenResponse) => {
      if (data.success) {
        alert("토큰 발급 성공" + JSON.stringify(data));

        localStorage.setItem("access_token", data.data.token);
        localStorage.setItem("user_info", JSON.stringify(data.data.info));

        navigate({ to: "/" });
      } else {
        alert("토큰 발급 실패" + data.error);
      }
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
