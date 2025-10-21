import type { UserRole } from "@user/types/user";

// export type WallInfo = {
//   authorName: string;
//   authorUuid: string;
//   authorImage: string | undefined;
//   messageUuid: string;
//   content: string;
//   createdAt: string;
//   updatedAt: string;
// };

export type WallInfo = {
  uuid: string;
  author: {
    uuid: string;
    name: string; // 그룹 내 닉네임
    role: UserRole;
    profileImageSrc: string | undefined;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
};
