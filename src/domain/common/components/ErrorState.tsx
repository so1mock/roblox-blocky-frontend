interface ErrorStateProps {
  /** 서버가 준 문구를 그대로 넘기면 된다 (ApiError.message) */
  message?: string;
  /** 넘기면 "다시 시도" 버튼을 보여준다. 보통 쿼리의 refetch 를 연결한다 */
  onRetry?: () => void;
}

/**
 * 화면의 일부(목록·섹션)를 불러오지 못했을 때 그 자리에 표시한다.
 *
 * 화면 전체가 해당 데이터에 의존하는 경우(예: 반 상세)에는 이걸 쓰지 말고,
 * 알림 후 목록으로 돌려보내는 편이 낫다. 빈 화면만 남기지 않기 위해서다.
 */
function ErrorState({
  message = "정보를 불러오지 못했습니다.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <p className="text-sm text-gray-600">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-3 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}

export default ErrorState;
