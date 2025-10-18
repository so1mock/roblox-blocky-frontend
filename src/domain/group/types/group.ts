import type { Board } from "../board/types/board";
import type { GroupMember } from "../user/types/user";
import type { Wall } from "../wall/types/wall";

export type Group = {
  groupSummary: GroupSummary;
  members: GroupMember[];
  boards: Board[];
  walls: Wall[];
};

export type GroupSummary = {
  groupUuid: string;
  groupName: string;
  groupDescription: string;
  joinedAt: string; // datetime?
  image: string | undefined;
};

// 그룹 멤버는 어떻게 저장할까?
// 멤버 + 플레이스까지 있어야 하니까 전용 타입을 따로 만들어야 할 지도?
