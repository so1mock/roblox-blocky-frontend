import type { GroupMember } from "@group/user/types/user";
import type { PlaceSummary } from "@place/types/place";

export type GroupMemberPlaces = {
  member: GroupMember;
  places: PlaceSummary[];
};
