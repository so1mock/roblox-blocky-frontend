import { useAuthStore } from "@user/stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { getToken, getUserInfo, logout } from "@user/apis/user.ts";
import { api } from "@common/apis/axios.ts";
import { useNavigate } from "@tanstack/react-router";

export const useUser = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();

  const handleLogin = useMutation({
    mutationFn: getToken,
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
    handleLogout: handleLogout.mutate,
  };
};
