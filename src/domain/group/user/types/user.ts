export type GroupMember = {
  uuid: string;
  nickname: string;
  profileImageSrc: string | undefined;
  role: "OWNER" | "MEMBER";
};
