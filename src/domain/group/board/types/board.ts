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
};

export type BoardInfo = {
  boardSummary: BoardSummary;
  content: string;
  attachedFiles: {
    name: string;
    src: string;
  }[];
};
