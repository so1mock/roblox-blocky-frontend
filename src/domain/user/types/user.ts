// 백엔드의 응답에 맞춘 타입
export type Auth = {
  accessToken: string;
};

export type UserRole = "LEARNER" | "EDUCATOR";

export interface BaseUser {
  uuid: string;
  nickname: string;
  role: UserRole;
  country: string;
  createTime: string;
}

export type DetailedUser = BaseUser;
