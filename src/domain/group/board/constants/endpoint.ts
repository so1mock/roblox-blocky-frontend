export const BOARD_ENDPOINT = {
  LIST: (groupUuid: string) => `/groups/${groupUuid}/boards`,
  DETAIL: (groupUuid: string, boardUuid: string) =>
    `/groups/${groupUuid}/boards/${boardUuid}`,
} as const;

export const ATTACHMENT_ENDPOINT = {
  PRESIGN: "/attachments/presign",
  CONFIRM: (attachmentUuid: string) => `/attachments/${attachmentUuid}/confirm`,
} as const;
