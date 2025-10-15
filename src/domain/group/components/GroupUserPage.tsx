import { useAuthStore } from "@user/stores/authStore";
import UserBoard from "../user/components/UserBoard";
import GroupNav from "./GroupNav";

function GroupUserPage({ id }: { id: string }) {
  const { userInfo } = useAuthStore();
  return (
    <div className="w-[1600px] mx-auto flex justify-center gap-24">
      {userInfo?.role === "EDUCATOR" && <GroupNav id={id} />}

      <div className="w-[1200px]">
        <h1 className="font-bold text-4xl">회원 관리</h1>

        <div className="bg-white rounded-2xl px-12 py-12 mt-12 flex flex-col gap-8">
          <UserBoard />
        </div>
      </div>
    </div>
  );
}

export default GroupUserPage;
