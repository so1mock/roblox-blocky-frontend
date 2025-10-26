import { PlaceViewCard } from "src/domain/myPlace/components/PlaceViewCard";
import GroupNav from "./GroupNav";
import type { PlaceSummary } from "src/domain/place/types/place";
import { useAuthStore } from "@user/stores/authStore";

// 학생별 플레이스 예시 데이터
const exampleStudentPlaces: Record<string, PlaceSummary[]> = {
  김철수: [
    {
      uuid: "1a2b3c4d",
      name: "연습 플레이스 1",
      description: "기초 로블록스 학습용 플레이스입니다.",
      ownerName: "김철수",
      lastModifiedAt: "2025-10-10T09:30:00Z",
      image: undefined,
    },
    {
      uuid: "1b2c3d4e",
      name: "연습 플레이스 2",
      description: "중급 학습용 플레이스입니다.",
      ownerName: "김철수",
      lastModifiedAt: "2025-10-09T14:20:00Z",
      image: undefined,
    },
  ],
  이수민: [
    {
      uuid: "2a3b4c5d",
      name: "프로젝트 플레이스",
      description: "팀 프로젝트용 플레이스입니다.",
      ownerName: "이수민",
      lastModifiedAt: "2025-10-08T18:45:00Z",
      image: undefined,
    },
  ],
  박지훈: [
    {
      uuid: "3a4b5c6d",
      name: "개인 연습 플레이스",
      description: "개인 연습용 플레이스입니다.",
      ownerName: "박지훈",
      lastModifiedAt: "2025-10-07T10:00:00Z",
      image: undefined,
    },
  ],
};

function GroupPlacePage({ id }: { id: string }) {
  const { userInfo } = useAuthStore();
  return (
    <div className="w-[1600px] mx-auto flex justify-center gap-24">
      {userInfo?.role === "EDUCATOR" && <GroupNav id={id} />}

      <div className="w-[1200px]">
        <div className="flex flex-col gap-6">
          <div className="flex gap-12 items-center">
            <img
              src="/imgProfile.png"
              alt="기본 반 이미지"
              className="w-32 h-32 object-cover rounded-2xl"
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
          {Object.entries(exampleStudentPlaces).map(([studentName, places]) => (
            <div key={studentName}>
              <h2 className="font-bold text-2xl mb-4">{studentName}</h2>
              <div className="flex gap-4 p-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {places.map((place) => (
                  <div key={place.uuid} className="flex-shrink-0">
                    <PlaceViewCard place={place} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GroupPlacePage;
