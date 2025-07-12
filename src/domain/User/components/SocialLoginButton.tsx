interface SocialLoginButtonProps {
  className?: string;
}

export function SocialLoginButton({ className = "" }: SocialLoginButtonProps) {
  return (
    <a
      className={`flex items-center whitespace-nowrap gap-1 h-10 bg-rbLogin min-w-fit p-2 rounded-lg ${className}`}
    >
      <img src="/Roblox_logo.png" className="w-7 h-7" />
      <div className="text-white">Roblox로 시작하기</div>
    </a>
  );
}
