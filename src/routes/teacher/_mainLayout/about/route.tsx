import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/_mainLayout/about")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 히어로 섹션 */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full">
            <span className="text-blue-600 font-semibold text-sm">
              블록 코딩 교육 플랫폼
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            CoBlocks와 함께
            <br />
            <span className="text-blue-500">재미있게 코딩을 배워요!</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            좋아하는 로블록스 게임을 만들면서 코딩 원리를 배울 수 있어요.
            <br />
            어려운 코드 대신 블록을 조립하듯 프로그래밍해보세요!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-4 bg-blue-500 text-white rounded-lg font-semibold text-lg hover:bg-blue-600 transition-colors shadow-lg"
              onClick={() => {
                navigate({ to: "/" });
              }}
            >
              지금 시작하기
            </button>
          </div>
        </div>
      </section>

      {/* 문제 정의 & 솔루션 */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* 문제 정의 */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                왜 CoBlocks인가요?
              </h2>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
                  <div className="text-3xl mb-3">😕</div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">
                    기존 교육 도구
                  </h3>
                  <p className="text-gray-600 text-sm">
                    스크래치, 엔트리는 익숙하지만 학생들의 흥미가 점점 떨어져요
                  </p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
                  <div className="text-3xl mb-3">🎮</div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">
                    로블록스는 인기!
                  </h3>
                  <p className="text-gray-600 text-sm">
                    전 세계 9,800만 명이 매일 즐기는 로블록스, 학생들이 정말
                    좋아해요
                  </p>
                </div>
                <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                  <div className="text-3xl mb-3">😰</div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">
                    하지만 어려워요
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Lua라는 생소한 언어 때문에 배우기 시작하기가 너무 어려워요
                  </p>
                </div>
              </div>
            </div>

            {/* 솔루션 */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
                <span className="text-xl">✨</span>
                <span className="font-bold">CoBlocks의 해결책</span>
                <span className="text-xl">✨</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                블록으로 쉽게, 로블록스로 재미있게!
              </h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                    <span className="text-3xl">🧩</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    블록 코딩으로 전환
                  </h3>
                  <p className="text-gray-700">
                    복잡한 Lua 코드를 블록 조립처럼 쉽게!
                    <br />
                    학생들의 흥미를 유지하며 코딩 사고력을 키워요
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
                  <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                    <span className="text-3xl">📚</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    양질의 교육 자료
                  </h3>
                  <p className="text-gray-700">
                    체계적으로 설계된 10가지 수업 자료로
                    <br />
                    단계별 코딩 개념을 재미있게 배워요
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 기능 소개 */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                CoBlocks의 주요 기능
              </h2>
              <p className="text-gray-600 text-lg">
                학생과 선생님 모두를 위한 완벽한 코딩 교육 환경
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* 기능 1: 블록 조립 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🧩</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  블록 조립 & 코드 변환
                </h3>
                <p className="text-gray-600 mb-4">
                  레고처럼 블록을 조립하면 자동으로 Lua 코드로 변환돼요!
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1 font-bold">✓</span>
                    <span>드래그 앤 드롭으로 쉬운 조립</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1 font-bold">✓</span>
                    <span>실시간 Lua 코드 미리보기</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1 font-bold">✓</span>
                    <span>변수, 이벤트, 함수 등 다양한 블록</span>
                  </li>
                </ul>
              </div>

              {/* 기능 2: 스튜디오 연동 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🎮</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  스튜디오 실시간 연동
                </h3>
                <p className="text-gray-600 mb-4">
                  로블록스 스튜디오와 실시간으로 연결되어 바로 테스트할 수
                  있어요!
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 font-bold">✓</span>
                    <span>탐색기 구조 자동 동기화</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 font-bold">✓</span>
                    <span>원클릭으로 스크립트 적용</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 font-bold">✓</span>
                    <span>안전한 플러그인 인증</span>
                  </li>
                </ul>
              </div>

              {/* 기능 3: 수업 관리 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">👥</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  수업 반 관리
                </h3>
                <p className="text-gray-600 mb-4">
                  선생님이 학생들을 쉽게 관리하고 과제를 내줄 수 있어요!
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1 font-bold">✓</span>
                    <span>반 생성 및 학생 초대</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1 font-bold">✓</span>
                    <span>학생별 플레이스 확인</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1 font-bold">✓</span>
                    <span>다양한 수업 자료 제공</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            지금 바로 CoBlocks를 시작해보세요!
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            로블록스로 코딩을 배우는 가장 재미있는 방법
          </p>
        </div>
      </section>
    </div>
  );
}
1;
