const baseUrl = import.meta.env.VITE_AUTHORIZATION_URL;
const searchParams = new URLSearchParams({
  client_id: import.meta.env.VITE_CLIENT_ID,
  // 현재 접속한 주소를 그대로 쓴다. 빌드 시점에 주소를 박지 않으므로
  // 같은 이미지를 dev(18000)와 prod(28000) 양쪽에 배포할 수 있다.
  // 단, Roblox 앱 설정에 두 주소를 모두 redirect URI 로 등록해야 한다.
  redirect_uri: window.location.origin + "/oauth/callback",
  scope: ["openid", "profile", "universe-messaging-service:publish"].join(" "),
  response_type: "code",
  state: "1234",
});
const robloxUrl = `${baseUrl}?${searchParams.toString()}`;

export function SocialLoginButton() {
  return (
    <a
      className={`flex items-center whitespace-nowrap gap-1 h-10 bg-[#335fff] min-w-fit p-2 rounded-lg cursor-pointer`}
      href={robloxUrl}
    >
      <img src="/Roblox_logo.png" className="w-7 h-7" />
      <div className="text-rbHoverText">Roblox로 시작하기</div>
    </a>
  );
}
