// import { api } from "../../common/apis/axios";
import { getOauthCode } from "../apis/getOauthCode";

export function SocialLoginButton({ className = "" }: { className: string }) {
  return (
    <a
      className={`flex items-center whitespace-nowrap gap-1 h-10 bg-rbLogin min-w-fit p-2 rounded-lg ${className}`}
      onClick={() =>
        getOauthCode({
          clientId: import.meta.env.VITE_CLIENT_ID,
          redirectUri: "http://localhost:5173/oAuth/callBack",
          scope: ["openid", "profile", "universe-messaging-service:publish"],
          state: "1234",
        })
      }
    >
      <img src="/Roblox_logo.png" className="w-7 h-7" />
      <div className="text-white">Roblox로 시작하기</div>
    </a>
  );
}
