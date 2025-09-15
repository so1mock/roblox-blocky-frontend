export type Auth = {
  accessToken: string;
};

export interface BaseUser {
  nickname: string;
  country: string;
  createTime: string;
}

export type DetailedUser = BaseUser;
