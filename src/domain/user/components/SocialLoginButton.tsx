const baseUrl = import.meta.env.VITE_AUTHORIZATION_URL;
const searchParams = new URLSearchParams({
  client_id: import.meta.env.VITE_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_FRONTEND_URL + "/oauth/callback",
  scope: ["openid", "profile", "universe-messaging-service:publish"].join(" "),
  response_type: "code",
  state: "1234",
});
const robloxUrl = `${baseUrl}?${searchParams.toString()}`;

export function SocialLoginButton({ className = "" }: { className?: string }) {
  return (
    <a
      className={`flex items-center whitespace-nowrap gap-1 h-10 bg-[#335fff] min-w-fit p-2 rounded-lg cursor-pointer ${className}`}
      href={robloxUrl}
    >
      <img src="/Roblox_logo.png" className="w-7 h-7" />
      <div className="text-rbHoverText">Roblox로 시작하기</div>
    </a>
  );
}
