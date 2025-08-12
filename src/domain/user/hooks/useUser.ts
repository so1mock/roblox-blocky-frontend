import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@user/stores/authStore.ts";
import { useMutation } from "@tanstack/react-query";
import { getToken, getUserInfo, logout } from "@user/apis/user.ts";
import { api } from "@common/apis/axios.ts";

export const useUser = () => {
  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogin = useMutation({
    mutationFn: getToken,
    onSuccess: async (data) => {
      console.log("로그인 성공" + JSON.stringify(data));

      api.defaults.headers.common["Authorization"] =
        `Bearer ${data.auth.accessToken}`;
      try {
        const user = await getUserInfo();
        setAuth(user);
        navigate({ to: "/" });
      } catch (error) {
        clearAuth();
        navigate({ to: "/" });
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
    },
    onError: (error) => {
      console.log("로그아웃 오류" + error.message);
      alert("로그아웃 오류" + error.message);
    },
  });

  return {
    handleLogin: handleLogin.mutate,
    handleLogout: handleLogout.mutate,
  };
};
