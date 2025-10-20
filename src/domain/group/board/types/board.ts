export type BoardInfo = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  attachedFiles: {
    name: string;
    src: string;
  }[];
};
