export const GROUP_USER_ENDPOINT = {
  INVITE: (groupUuid: string) => `/groups/${groupUuid}/invite`,
  JOIN: "/groups/join",
  MEMBERS: (groupUuid: string) => `/groups/${groupUuid}/members`,
  MEMBER: (groupUuid: string, memberUuid: string) =>
    `/groups/${groupUuid}/members/${memberUuid}`,
} as const;
