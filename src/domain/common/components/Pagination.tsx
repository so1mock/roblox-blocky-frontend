/*
  Pagination 컴포넌트

  역할
  - 하단 페이지 번호 버튼을 렌더링하고, 선택된 페이지를 부모로 전달합니다.

  Props
  - pageInfo: {
      currentPageNumber: number;      // 현재 페이지 번호(1-base)
      totalPages: number;             // 총 페이지 수
      visiblePagesCount: number;      // 동시에 표시할 버튼 개수
    }
  - setCurrentPage: (page: number) => void // 페이지 변경 콜백

  동작
  - 현재 페이지를 기준으로 visiblePagesCount 범위를 계산합니다.
  - 경계(처음/끝) 근처에서는 부족한 쪽 수만큼 반대편으로 채우므로, 선택된 페이지가 항상 중앙에 오지는 않습니다.
  - 계산된 범위가 1 ~ totalPages를 벗어나지 않도록 보정합니다.
  - 버튼 클릭 시 setCurrentPage를 호출해 부모에 변경을 전달합니다.
  - 총 페이지 수가 visiblePagesCount보다 적을 수 있어, 실제 표시 개수(showCount)를 두 값 중 작은 값으로 정규화한 뒤 이를 기준으로 계산합니다.
*/
import type { PageInfo } from "../types/page";

function Pagination({
  pageInfo,
  setCurrentPage,
}: {
  pageInfo: PageInfo;
  setCurrentPage: (page: number) => void;
}) {
  // 표시할 숫자들의 배열
  let pages: number[] = [];
  // 실제 표시 개수: 총 페이지 수와 가시 개수 중 작은 값
  const showCount = Math.min(pageInfo.visiblePagesCount, pageInfo.totalPages);

  const half = Math.floor((showCount - 1) / 2);
  // 이상적인 페이지의 시작과 끝 번호
  let startPage = pageInfo.currentPageNumber - half;
  let endPage = pageInfo.currentPageNumber + half;

  // 페이지 개수가 짝수인 경우 왼쪽 페이지가 하나 더 많도록 설정
  if (showCount % 2 === 0) {
    startPage -= 1;
  }

  // 경계 보정: 왼쪽 부족분을 오른쪽으로 채움
  if (startPage < 1) {
    const deficit = 1 - startPage;
    startPage = 1;
    endPage = Math.min(pageInfo.totalPages, endPage + deficit);
  }

  // 경계 보정: 오른쪽 부족분을 왼쪽으로 채움
  if (endPage > pageInfo.totalPages) {
    const deficit = endPage - pageInfo.totalPages;
    endPage = pageInfo.totalPages;
    startPage = Math.max(1, startPage - deficit);
  }

  pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );
  return (
    <div className="flex justify-center mt-6 gap-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => {
            setCurrentPage(page);
          }}
          className={`px-4 py-2 rounded border cursor-pointer ${
            pageInfo.currentPageNumber === page
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
