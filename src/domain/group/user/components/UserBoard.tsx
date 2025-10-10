import UserListHeader from "./UserListHeader";
import UserListItem from "./UserListItem";
import Button from "@common/components/Button";

function UserBoard() {
  return (
    <div className="inline-block mx-auto">
      <div className="flex items-center justify-between">
        <span className="font-bold text-2xl">반 구성원 리스트</span>
        <Button
          text="초대 링크 생성"
          handleButtonClick={() => {
            // to do
            // 학생 초대 링크 생성 API 연결
          }}
        />
      </div>

      <hr className="h-[2px] bg-black mt-3" />
      <UserListHeader />
      <UserListItem />
    </div>
  );
}

export default UserBoard;
