function UserListHeader() {
  return (
    <div className="custom-scrollbar whitespace-nowrap bg-white py-4 border-solid border-[#DEDEDE] border-b-2">
      <div className="w-[300px] inline-block text-center">
        <span className="text-black text-xl font-bold">이름</span>
      </div>
      <div className="w-[300px] inline-block text-center">
        {/* <span className="text-black text-xl font-bold">반 가입 날짜</span> */}
        <span className="text-black text-xl font-bold">역할</span>
      </div>
      <div className="w-[300px] inline-block text-center">
        <span className="text-black text-xl font-bold" />
      </div>
    </div>
  );
}

export default UserListHeader;
