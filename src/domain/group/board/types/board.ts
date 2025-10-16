export type Board = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  attachedFiles: {
    name: string;
    src: string;
  }[];
};
