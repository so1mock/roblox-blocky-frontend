import { useAuthStore } from "@user/stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { socialLogin, getUserInfo, logout, login } from "@user/apis/user.ts";
import { setAccessToken } from "@common/apis/axios.ts";
import { useNavigate } from "@tanstack/react-router";

export const useUser = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();

  const applyLogin = async (accessToken: string) => {
    setAccessToken(accessToken);
    try {
      setAuth(await getUserInfo());
    } catch {
      setAccessToken(null);
      clearAuth();
    }
  };

  const handleSocialLogin = useMutation({
    mutationFn: socialLogin,
    onSuccess: (data) => applyLogin(data.auth.accessToken),
  });

  const handleLogin = useMutation({
    mutationFn: login,
    onSuccess: (data) => applyLogin(data.auth.accessToken),
  });

  const handleLogout = useMutation({
    mutationFn: logout,
    // 서버 호출이 실패해도 클라이언트 상태는 반드시 정리한다
    onSettled: () => {
      setAccessToken(null);
      clearAuth();
      navigate({ to: "/" });
    },
  });

  return {
    handleLogin: handleLogin.mutateAsync,
    handleSocialLogin: handleSocialLogin.mutateAsync,
    handleLogout: handleLogout.mutate,
  };
};
