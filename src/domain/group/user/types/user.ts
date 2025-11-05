import type { PlaceSummary } from "@place/types/place";

export type GroupMember = {
  uuid: string;
  nickname: string;
  profileImageSrc: string | undefined;
  role: "OWNER" | "MEMBER";
};

export type GroupPlaces = {
  member: GroupMember;
  places: PlaceSummary[];
};
