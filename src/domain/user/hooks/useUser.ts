import { useAuthStore } from "@user/stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { socialLogin, getUserInfo, logout, login } from "@user/apis/user.ts";
import { api } from "@common/apis/axios.ts";
import { useNavigate } from "@tanstack/react-router";

export const useUser = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();

  const handleSocialLogin = useMutation({
    mutationFn: socialLogin,
    onSuccess: async (data) => {
      console.log("소셜 로그인 성공" + JSON.stringify(data));

      api.defaults.headers.common["Authorization"] =
        `Bearer ${data.auth.accessToken}`;
      try {
        const user = await getUserInfo();
        setAuth(user);
      } catch (error) {
        console.log(error);
        clearAuth();
      }
    },
    onError: (error) => {
      console.log("소셜 로그인 오류" + error.message);
      alert("소셜 로그인 오류" + error.message);
    },
  });

  const handleLogin = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      console.log("로그인 성공" + JSON.stringify(data));

      api.defaults.headers.common["Authorization"] =
        `Bearer ${data.auth.accessToken}`;
      try {
        const user = await getUserInfo();
        setAuth(user);
      } catch (error) {
        console.log(error);
        clearAuth();
      }
    },
    onError: (error) => {
      console.log("로그인 오류" + error.message);
      alert("로그인 오류" + error.message);
    },
  });

  const handleLogout = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth();
      navigate({ to: "/" });
    },
    onError: (error) => {
      console.log("로그아웃 오류" + error.message);
      alert("로그아웃 오류" + error.message);
    },
  });

  return {
    handleLogin: handleLogin.mutateAsync,
    handleSocialLogin: handleSocialLogin.mutateAsync,
    handleLogout: handleLogout.mutate,
  };
};
