export type Group = {
  groupSummary: GroupSummary;
  ownerNickname: string;
  memberCount: number;
};

export type GroupSummary = {
  uuid: string;
  name: string;
  description: string;
  image: string | undefined;
};

// 그룹 멤버는 어떻게 저장할까?
// 멤버 + 플레이스까지 있어야 하니까 전용 타입을 따로 만들어야 할 지도?
