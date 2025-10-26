import type { PageInfo } from "@common/types/page";
import type { UserRole } from "@user/types/user";

export interface WallInfo {
  uuid: string;
  author: {
    uuid: string;
    nickname: string; // 그룹 내 닉네임
    role: UserRole;
    profileImageSrc?: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
}

// 페이지네이션 시 여러 WallInfo를 담는 형태
export interface WallInfoPagination extends PageInfo {
  wallMessages: WallInfo[];
}
