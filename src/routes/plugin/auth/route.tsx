import {
  createFileRoute,
  useSearch,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { getPluginAuth } from "@user/apis/auth";
import { verifyAuth } from "@user/utils/authGuard";
import { useEffect } from "react";

type SearchParams = {
  user_code?: string;
};

export const Route = createFileRoute("/plugin/auth")({
  beforeLoad: async ({ search }: { search: SearchParams }) => {
    await verifyAuth({ timeoutMs: 3000 });

    // 쿼리 파라미터 유효성 검사
    if (!search.user_code) {
      // 근데 어떻게 처리하지?
      alert("유효한 url이 아닙니다."); // user_code가 없는 경우
      throw redirect({ to: "/", search: { next: "/plugin/auth" } });
    }
  },

  component: RouteComponent,
});

function RouteComponent() {
  // verifyAuth를 거쳤기 때문에 로그인된 상태라 가정
  const { user_code: userCode = "" } = useSearch({
    from: "/plugin/auth",
  }) as SearchParams;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPluginAuth = async () => {
      try {
        // const response = await getPluginAuth(String(userCode));
        // alert("인증에 성공했어요~" + JSON.stringify(response));
        await getPluginAuth(String(userCode));
        navigate({ to: "/my-places" });
      } catch (error: any) {
        alert("api 요청 실패" + error.message);
      }
    };
    fetchPluginAuth();
  }, [userCode]);
  return <div>"플러그인과 인증을 진행 중이에요~"</div>;
}
