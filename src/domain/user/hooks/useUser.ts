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
      api.defaults.headers.common["Authorization"] =
        `Bearer ${data.auth.accessToken}`;
      try {
        const user = await getUserInfo();
        setAuth(user);
      } catch (error) {
        clearAuth();
      }
    },
  });

  const handleLogin = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      api.defaults.headers.common["Authorization"] =
        `Bearer ${data.auth.accessToken}`;
      try {
        const user = await getUserInfo();
        setAuth(user);
      } catch (error) {
        clearAuth();
      }
    },
  });

  const handleLogout = useMutation({
    mutationFn: logout,
    onSuccess: () => {
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
