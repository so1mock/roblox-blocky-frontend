export const GROUP_ENDPOINT = {
  ROOT: "/groups",
  MY_LIST: "/groups/me",
  DETAIL: (groupUuid: string) => `/groups/${groupUuid}`,
  ICON_UPLOAD_URL: (groupUuid: string) =>
    `/groups/${groupUuid}/icon-upload-url`,
} as const;
