import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { type User } from "../domain/user/types.ts";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const {
    data: user,
    isSuccess: isLogin,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user: User = JSON.parse(localStorage.getItem("user_info") || "");
      return user;
    },
  });

  useEffect(() => {
    if (!isLoading) {
      if (isLogin) {
        alert("환영합니다" + user.nickname);
      } else {
        alert("로그인을 해주세요");
      }
    }
  }, [isLogin]);

  return (
    <div className="p-2">
      <h3 className="text-rbText">Main Page</h3>
    </div>
  );
}
