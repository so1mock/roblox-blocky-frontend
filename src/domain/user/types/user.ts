export interface BaseUser {
  nickname: string;
  country: string;
  createTime: string;
}

export interface DetailedUser extends BaseUser {
  nickname: string;
  country: string;
  createTime: string;
}

export type Auth = {
  accessToken: string;
};
