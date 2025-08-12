import type { DetailedUser, Auth } from "@user/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLogin: boolean | null;
  userInfo: DetailedUser | null;
  accessToken: string | null;
  setAuth: (userInfo: DetailedUser, auth?: Auth) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogin: null,
      userInfo: null,
      accessToken: null,
      setAuth: (userInfo, auth) => set({ 
        isLogin: true, 
        userInfo, 
        accessToken: auth?.accessToken || null 
      }),
      setToken: (token) => set({ accessToken: token }),
      clearAuth: () => set({ isLogin: false, userInfo: null, accessToken: null }),
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);
