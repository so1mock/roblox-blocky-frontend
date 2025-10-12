import Button from "@common/components/Button";
import { useState } from "react";

function GroupWallCreateForm() {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return alert("내용을 입력해주세요.");
    console.log("게시 내용:", content);
    setContent(""); // 작성 후 초기화
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
        className="w-full m-4 ml-0 p-6 min-h-[120px] bg-[#F9F9F9] rounded-2xl"
      />
      <div className="absolute bottom-10 right-8">
        <Button
          text="게시하기"
          handleButtonClick={() => {
            // todo
            // 담벼락 글 작성 API 연결
          }}
        />
      </div>
    </form>
  );
}

export default GroupWallCreateForm;
