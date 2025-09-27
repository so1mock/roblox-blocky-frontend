import Footer from "@common/components/Footer";
import { TeacherHeader } from "@common/components/header/TeacherHeader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[url(/mainBackground.png)] bg-center bg-cover">
      <TeacherHeader />

      <main className="flex justify-center items-center gap-20 min-w-[1400px]">
        {/* 텍스트 영역 */}
        <div className="flex flex-col text-4xl">
          <span className="mb-2">CoBlocks와 함께, 복잡한 코딩 수업도</span>
          <span className="font-bold mt-2">
            쉽고 재미있게 진행할 수 있어요!
          </span>
        </div>

        {/* 영상 영역 */}
        <section className="flex flex-col items-center gap-4">
          <span className="bg-rbBackground text-rbBlueText px-8 py-2 rounded-3xl font-bold">
            튜토리얼
          </span>

          <video
            className="rounded-xl shadow-lg w-[640px] border-solid border-8 border-rbBorder"
            controls
          >
            <source
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              type="video/mp4"
            />
            브라우저가 video 태그를 지원하지 않습니다.
          </video>
        </section>
        <div className="absolute bottom-26 bg-rbPointColor w-full text-center py-2 animate-[marquee] overflow-x-hidden">
          <span className="text-rbHoverText text-lg font-bold animate-marquee">
            로블록스 수업, 어렵지 않아요! 블록을 쌓듯 간단하게 가르치고,학생들의
            창의력과 협업을 이끌어보세요.
          </span>
        </div>
      </main>

      <Footer />
    </div>
  );
}
