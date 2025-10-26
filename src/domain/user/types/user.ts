// 백엔드의 응답에 맞춘 타입
export type Auth = {
  accessToken: string;
};

export type UserRole = "LEARNER" | "EDUCATOR";

export interface UserInfo {
  uuid: string;
  nickname: string;
  profileImageSrc: string | undefined;
  role: UserRole;
  country: string;
  createTime: string;
}
