import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useUser } from "../domain/user/hooks/useUser.ts";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { userInfo, isLogin, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading) {
      if (isLogin && userInfo) {
        alert("환영합니다" + userInfo.nickname + "!");
      } else {
        alert("로그인 해주세요.");
      }
    }
  }, [isLoading]);

  return (
    <div className="p-2">
      <h3 className="text-rbText">Main Page</h3>
    </div>
  );
}
