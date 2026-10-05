import { type UserInfo, type Auth } from "../types/user.ts";
import { api } from "../../common/apis/axios.ts";
import { USER_ENDPOINT } from "../constants/endpoint.ts";
import { AxiosError } from "axios";

export type LoginResponse = {
  info: UserInfo;
  auth: Auth;
};

// 소셜로그인에서 얻은 코드를 통해서 소셜 로그인 진행
export const socialLogin = async (code: string): Promise<LoginResponse> => {
  try {
    const response = await api.post(USER_ENDPOINT.SOCIAL_LOGIN, { code: code });
    const { token, info } = response.data;
    return {
      info: info,
      auth: {
        accessToken: token,
      },
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
    }
    throw e;
  }
};

// 닉네임, 패스워드를 사용한 일반 로그인
export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const response = await api.post(USER_ENDPOINT.LOCAL_LOGIN, {
      username: username,
      password: password,
    });
    const { token, info } = response.data;
    return {
      info: info,
      auth: {
        accessToken: token,
      },
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
    }
    throw e;
  }
};

// 사용자 정보 조회
export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await api.get(USER_ENDPOINT.ME);
    const info: UserInfo = response.data;
    return info;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
    }
    throw e;
  }
};

// 로그아웃
export const logout = async (): Promise<void> => {
  try {
    await api.post(USER_ENDPOINT.LOGOUT);
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
    }
    throw e;
  }
};
