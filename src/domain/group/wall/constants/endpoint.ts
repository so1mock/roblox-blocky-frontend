export const WALL_ENDPOINT = {
  MESSAGES: (groupUuid: string) => `/groups/${groupUuid}/wall/messages`,
  MESSAGE: (messageUuid: string) => `/groups/wall/message/${messageUuid}`,
} as const;
