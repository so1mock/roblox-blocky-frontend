export type BoardSummary = {
  boardUuid: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

// 상세 조회용 게시글 정보
export type BoardInfo = BoardSummary & {
  groupMemberProfile: {
    uuid: string;
    name: string;
  };
  content: string;
  attachments: {
    attachmentUuid: string;
    fileName: string;
    fileSrc: string;
  }[];
};

// 수정, 생성용 게시글 정보
export type UpdateBoardInfo = {
  title: string;
  content: string;
  attachmentUuids: string[];
};
export type CreateBoardInfo = UpdateBoardInfo;
