import { api } from "@common/apis/axios";
import type { GroupInfo, GroupSummary } from "../types/group";
import type { ImageFileType } from "@common/types/image";
import { GROUP_ENDPOINT } from "../constants/endpoint";

export type CreateGroupRequest = {
  name: string;
  description: string;
};

// 그룹 생성
export const createGroup = async (
  groupInfo: CreateGroupRequest,
): Promise<GroupSummary> => {
  const response = await api.post(GROUP_ENDPOINT.ROOT, groupInfo);
  return response.data;
};

// 그룹 삭제
export const deleteGroup = async (uuid: string) => {
  const response = await api.delete(GROUP_ENDPOINT.DETAIL(uuid));
  return 200 <= response.data.status && response.data.status < 300;
};

// 내가 속한 그룹 목록 조회
export const getMyGroups = async (): Promise<GroupSummary[]> => {
  const response = await api.get(GROUP_ENDPOINT.MY_LIST);
  return response.data.groups;
};

// 그룹 상세 정보 조회
export const getGroupInfo = async (groupId: string): Promise<GroupInfo> => {
  const response = await api.get(GROUP_ENDPOINT.DETAIL(groupId));
  return {
    groupSummary: response.data.group,
    ownerNickname: response.data.ownerNickname,
    memberCount: response.data.memberCount,
  };
};

// 그룹 정보 수정(반 이름, 반 설명))
export const updateGroupInfo = async (editedGroupInformation: GroupSummary) => {
  const response = await api.put(
    GROUP_ENDPOINT.DETAIL(editedGroupInformation.uuid),
    {
      name: editedGroupInformation.name,
      description: editedGroupInformation.description,
    },
  );
  return 200 <= response.data.status && response.data.status < 300;
};

// 그룹 아이콘 업로드 presignedUrl 발급
export const getGroupIconUploadUrl = async (
  uuid: string,
  type: ImageFileType,
): Promise<string> => {
  const response = await api.post(GROUP_ENDPOINT.ICON_UPLOAD_URL(uuid), null, {
    params: {
      type,
    },
  });
  return response.data.uploadUrl;
};
