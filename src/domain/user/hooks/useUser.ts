import { useMutation } from "@tanstack/react-query";
import { getToken, getUserInfo, logout } from "../apis/user.ts";
import { api } from "../../common/apis/axios.ts";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../stores/authStore.ts";

/*
필요한 거)
로그인 여부, 유저 데이터, 로그아웃 기능, 로그인 기능
*/
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
    handleLogin: handleLogin,
    handleLogout,
  };
};
