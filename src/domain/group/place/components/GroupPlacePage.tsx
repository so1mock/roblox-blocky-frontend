import GroupNav from "../../components/GroupNav";
import { useAuthStore } from "@user/stores/authStore";
import { useGroupDetailQuery } from "../../hooks/useGroupDetailQuery";
import { useGroupPlacesQuery } from "../hooks/useGroupPlacesQuery";
import { GroupUserPlacesRow } from "./GroupUserPlacesRow";

function GroupPlacePage({ id }: { id: string }) {
  const { userInfo } = useAuthStore();
  const { data: groupPlaces } = useGroupPlacesQuery(id);

  const { data: groupInfo, isLoading: isGroupInfoLoading } =
    useGroupDetailQuery(id);

  if (isGroupInfoLoading || groupInfo === undefined)
    return <div>Loading...</div>;

  return (
    <div className="w-[1600px] mx-auto flex justify-center gap-24">
      {userInfo?.role === "EDUCATOR" && <GroupNav id={id} />}
      <div className="w-[1200px]">
        <div className="flex flex-col gap-6">
          <div className="flex gap-12 items-center">
            <img
              src={groupInfo.groupSummary.iconSrc}
              alt={groupInfo.groupSummary.name}
              className="w-32 h-32 object-cover rounded-2xl"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/imgProfile.png";
              }}
            />
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-white bg-rbPrimaryColor px-2 py-2 rounded-3xl">
                  학생 {groupInfo.memberCount}명
                </span>
              </div>

              <h1 className="font-bold text-4xl">
                {groupInfo.groupSummary.name}
              </h1>
              <span>개설자: {groupInfo.ownerNickname}</span>
            </div>
          </div>
          <span>{groupInfo.groupSummary.description}</span>
        </div>

        <div className="bg-white rounded-2xl px-12 py-12 mt-8 flex flex-col gap-8">
          {groupPlaces?.map((groupMemberPlaces) => {
            return (
              <GroupUserPlacesRow
                key={groupMemberPlaces.member.uuid}
                groupMemberPlaces={groupMemberPlaces}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GroupPlacePage;
