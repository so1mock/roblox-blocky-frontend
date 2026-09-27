export const USER_ENDPOINT = {
  SOCIAL_LOGIN: "/oauth2/roblox/callback",
  LOCAL_LOGIN: "/local-auth",
  ME: "/member/me",
  LOGOUT: "/member/logout",
  REFRESH: "/member/refresh",
} as const;

export const AUTH_ENDPOINT = {
  PLUGIN_VERIFY: "/auth/plugin/verify",
} as const;
