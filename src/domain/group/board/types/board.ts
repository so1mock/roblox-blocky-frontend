export type BoardSummary = {
  uuid: string;
  title: string;
  createdAt: string;
  author: {
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
