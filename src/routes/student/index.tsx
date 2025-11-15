import Footer from "@common/components/Footer";
import { StudentHeader } from "@common/components/header/StudentHeader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/student/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[url(/mainBackground.png)] bg-center bg-cover min-w-[1400px]">
      <StudentHeader />

      <main className="flex justify-center items-center gap-20">
        {/* 텍스트 영역 */}
        <div className="flex flex-col text-4xl">
          <span className="mb-2">CoBlocks와 함께, 당신의 아이디어를</span>
          <span className="font-bold mt-2">블록으로 쉽게 만들어 보세요!</span>
        </div>

        {/* 영상 영역 */}
        <section className="flex flex-col items-center gap-4">
          <span className="bg-rbBackground text-rbBlueText px-8 py-2 rounded-3xl font-bold">
            수업 영상
          </span>
          <div className="w-[640px] aspect-video rounded-xl overflow-hidden shadow-md mb-6">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/J_P8y_IJGWk?si=ZLndK_Tmcx5Lx_uu"
              title="새 플레이스 연결 방법 안내 영상"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        <div className="absolute bottom-26 bg-rbPointColor w-full text-center py-2 animate-[marquee] overflow-x-hidden">
          <span className="text-rbHoverText text-lg font-bold animate-marquee">
            로블록스 게임 만들기 어렵다고요? 블록을 조립하듯 쉽게 코딩하고,
            게임을 만들어 친구들과 함께 공유해보세요!
          </span>
        </div>
      </main>
      <Footer />
    </div>
  );
}
