import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getToken, getUserInfo, logout } from "../apis/user.ts";
import { api } from "../../common/apis/axios.ts";

/*
필요한 거)
로그인 여부, 유저 데이터, 로그아웃 기능, 로그인 기능
*/
export const useUser = () => {
  const queryClient = useQueryClient();

  const {
    data: userInfo,
    isSuccess: isLogin,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getUserInfo();
      return response;
    },
  });

  const handleLogin = useMutation({
    mutationFn: getToken,
    onSuccess: (data) => {
      console.log("로그인 성공" + JSON.stringify(data));

      api.defaults.headers.common["Authorization"] =
        `Bearer ${data.auth.accessToken}`;
      window.location.href = "/";
    },
    onError: (error) => {
      console.log("로그인 오류" + error.message);
      alert("로그인 오류" + error.message);
    },
  });

  const handleLogout = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.log("로그아웃 오류" + error.message);
      alert("로그아웃 오류" + error.message);
    },
  });

  return {
    userInfo: userInfo,
    isLogin: isLogin,
    isLoading: isLoading,
    handleLogin: handleLogin.mutate,
    handleLogout: handleLogout.mutate,
  };
};
