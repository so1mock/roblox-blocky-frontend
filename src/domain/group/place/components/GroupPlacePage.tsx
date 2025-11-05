import GroupNav from "../../components/GroupNav";
import { useAuthStore } from "@user/stores/authStore";
import { useGroupDetailQuery } from "../../hooks/useGroupDetailQuery";
import { useNavigate } from "@tanstack/react-router";
import { useGroupPlacesQuery } from "../hooks/useGroupPlacesQuery";
import { GroupUserPlacesRow } from "./GroupUserPlacesRow";

// 학생별 플레이스 예시 데이터
// const exampleStudentPlaces: Record<string, PlaceSummary[]> = {
//   김철수: [
//     {
//       uuid: "1a2b3c4d",
//       name: "연습 플레이스 1",
//       description: "기초 로블록스 학습용 플레이스입니다.",
//       ownerName: "김철수",
//       lastModifiedAt: "2025-10-10T09:30:00Z",
//       mainImageUrl: undefined,
//       createdAt: "2025-10-10T09:30:00Z",
//     },
//     {
//       uuid: "1b2c3d4e",
//       name: "연습 플레이스 2",
//       description: "중급 학습용 플레이스입니다.",
//       ownerName: "김철수",
//       lastModifiedAt: "2025-10-09T14:20:00Z",
//       mainImageUrl: undefined,
//       createdAt: "2025-10-09T14:20:00Z",
//     },
//   ],
//   이수민: [
//     {
//       uuid: "2a3b4c5d",
//       name: "프로젝트 플레이스",
//       description: "팀 프로젝트용 플레이스입니다.",
//       ownerName: "이수민",
//       lastModifiedAt: "2025-10-08T18:45:00Z",
//       mainImageUrl: undefined,
//       createdAt: "2025-10-08T18:45:00Z",
//     },
//   ],
//   박지훈: [
//     {
//       uuid: "3a4b5c6d",
//       name: "개인 연습 플레이스",
//       description: "개인 연습용 플레이스입니다.",
//       ownerName: "박지훈",
//       lastModifiedAt: "2025-10-07T10:00:00Z",
//       mainImageUrl: undefined,
//       createdAt: "2025-10-07T10:00:00Z",
//     },
//   ],
// };

function GroupPlacePage({ id }: { id: string }) {
  const navigate = useNavigate();
  const { userInfo } = useAuthStore();

  const { data: groupPlaces } = useGroupPlacesQuery(id);

  const {
    data: groupInfo,
    isLoading: isGroupInfoLoading,
    isError: isGroupInfoError,
    error: groupInfoError,
  } = useGroupDetailQuery(id);

  if (isGroupInfoError) {
    alert("유효하지 않은 반입니다. " + groupInfoError.message);
    navigate({
      to: `/${userInfo?.role === "EDUCATOR" ? "teacher" : "student"}/group`,
    });
    return null;
  }

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
                  학생 12명
                </span>
              </div>

              <h1 className="font-bold text-4xl">연습 1반</h1>
              <span>개설자: 김선우</span>
            </div>
          </div>
          <span>이 반은 기초 로블록스 학습을 위해 생성된 반입니다.</span>
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
