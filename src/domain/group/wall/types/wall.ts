/*
확장 가능성
updatedAt
좋아요나 답글
*/

export type WallInfo = {
  authorName: string;
  authorUuid: string;
  authorImage: string | undefined;
  messageUuid: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};
