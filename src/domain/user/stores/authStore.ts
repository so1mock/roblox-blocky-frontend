import type { DetailedUser } from "@user/types/user";
import { create } from "zustand";

interface AuthState {
  isLogin: boolean | null;
  userInfo: DetailedUser | null; // UserType은 유저 정보 타입으로 대체하세요
  setAuth: (userInfo: DetailedUser) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: null,
  userInfo: null,
  setAuth: (userInfo) => set({ isLogin: true, userInfo }),
  clearAuth: () => set({ isLogin: false, userInfo: null }),
}));
