import type { PlaceSummary } from "@place/types/place";
import type { UserRole } from "@user/types/user";

export type GroupMember = {
  uuid: string;
  nickname: string;
  profileImageSrc: string | undefined;
  role: UserRole;
};

export type GroupMemberWithPlaces = {
  uuid: string;
  nickname: string;
  profileImageSrc: string | undefined;
  role: UserRole;
  places: PlaceSummary[];
};
