import { createFileRoute, useSearch, redirect } from "@tanstack/react-router";
import { verifyAuth } from "@user/utils/authGuard";
import { useEffect } from "react";

type SearchParams = {
  user_code?: string;
};

export const Route = createFileRoute("/plugin/auth")({
  beforeLoad: async ({ search }: { search: SearchParams }) => {
    await verifyAuth({ timeoutMs: 3000 });

    const user_code =
      typeof search.user_code === "string" && search.user_code.length > 0
        ? search.user_code
        : undefined;
    // 쿼리 파라미터 유효성 검사
    if (user_code) {
      // 근데 어떻게 처리하지?
      alert("유효한 url이 아닙니다.");
      throw redirect({ to: "/", search: { next: "/plugin/auth" } });
    }
  },

  component: RouteComponent,
});

function RouteComponent() {
  // verifyAuth를 거쳤기 때문에 로그인된 상태라 가정
  const { user_code } = useSearch({ from: "/plugin/auth" });

  useEffect(() => {
    try {
      //
    } catch (error) {}
  }, [user_code]);
  return <div>Hello "플러그인과 인증을 진행 중이에요~"</div>;
}
