import { setAccessToken } from "@common/apis/axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { refreshToken } from "@user/apis/refresh";
import { useAuthStore } from "@user/stores/authStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // 실패 시 3번 재시도 (기본값)
    },
  },
});

export const Route = createRootRoute({
  beforeLoad: async () => {
    const { isLogin, setAuth, clearAuth } = useAuthStore.getState();

    // 루트 beforeLoad 는 화면을 이동할 때마다 실행된다.
    // 여기서 하려는 일은 "앱을 처음 열었을 때 세션 복원" 한 가지뿐이므로,
    // 로그인 여부가 이미 판별된 뒤에는 다시 갱신하지 않는다.
    // (isLogin 의 null 은 "아직 확인 전" 을 뜻한다)
    // 세션 도중 토큰이 만료되는 것은 401 인터셉터가 처리한다.
    if (isLogin !== null) return;

    try {
      const response = await refreshToken();
      setAccessToken(response.auth.accessToken);
      setAuth(response.info);
    } catch {
      setAccessToken(null);
      clearAuth();
    }
  },
  component: () => {
    return (
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <TanStackRouterDevtools />
      </QueryClientProvider>
    );
  },
});
