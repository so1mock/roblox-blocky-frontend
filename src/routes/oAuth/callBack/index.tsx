import { createFileRoute } from "@tanstack/react-router";
import {
  getToken,
  type GetTokenResponse,
} from "../../../domain/user/apis/getToken";
import { useEffect, useState } from "react";
// import { useSearch } from "@tanstack/react-router";

type SearchParams = {
  code?: string;
  state?: string;
  error?: string;
};

export const Route = createFileRoute("/oAuth/callBack/")({
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
  const { code, state, error } = Route.useSearch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<GetTokenResponse | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (code) {
        const result = await getToken(code);
        setResponse(result);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [code]);

  if (!code) {
    return <div>인증 코드가 없음</div>;
  }

  if (error) {
    return <div>인증 코드 에러 발생</div>;
  }

  if (isLoading) {
    return <div> 로딩중</div>;
  }

  console.log(response);
  if (response?.success) {
    return (
      <div>
        <div>토큰 발급 성공</div>
        <div>{response.data.info.nickname}</div>
      </div>
    );
  } else {
    return <div>토큰 발급 실패</div>;
  }
}
