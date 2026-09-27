import { useLastUpdatedMyPlaceTimeQuery } from "./useLastUpdatedMyPlaceTimeQuery";
import { useLastUpdatedPlaceTimeQuery } from "./useLastUpdatedPlaceTimeQuery";
import { useStudentWorkspaceDataQuery } from "./useStudentWorkspaceDataQuery";
import { useWorkspaceDataQuery } from "./useWorkspaceDataQuery";

// 교사가 학생 플레이스를 보는 경우와 본인 플레이스를 여는 경우의 엔드포인트가 다르다.
// 훅은 조건부로 호출할 수 없으므로 양쪽을 모두 걸어두고 enabled 로 한쪽만 실행시킨다.
export const useWorkspaceData = (
  placeId: string,
  studentId: string | undefined,
  readOnly: boolean,
) => {
  const isStudentView = readOnly && !!studentId;

  const myPlaceTime = useLastUpdatedMyPlaceTimeQuery(placeId, {
    enabled: !isStudentView,
  });
  const studentPlaceTime = useLastUpdatedPlaceTimeQuery(studentId, placeId, {
    enabled: isStudentView,
  });
  const lastUpdatedTime = isStudentView
    ? studentPlaceTime.data
    : myPlaceTime.data;

  const myWorkspace = useWorkspaceDataQuery(placeId, {
    lastUpdatedTime,
    enabled: !isStudentView,
  });
  const studentWorkspace = useStudentWorkspaceDataQuery(studentId, placeId, {
    lastUpdatedTime,
    enabled: isStudentView,
  });

  return isStudentView
    ? {
        workspaceData: studentWorkspace.data,
        isError: studentPlaceTime.isError || studentWorkspace.isError,
      }
    : {
        workspaceData: myWorkspace.data,
        isError: myPlaceTime.isError || myWorkspace.isError,
      };
};
