import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  /** 경계 이름. 어느 영역에서 터졌는지 로그로 구분하기 위해 쓴다 */
  name?: string;
  /** 기본 화면 대신 보여줄 내용. 함수면 복구 함수를 받는다 */
  fallback?: ReactNode | ((reset: () => void) => ReactNode);
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * 렌더링 중 발생한 예외를 잡아 흰 화면 대신 복구 UI 를 보여준다.
 *
 * API 에러는 여기서 다루지 않는다. 그쪽은 ApiError 로 정규화해
 * 폼 안(인라인)이나 화면 내 에러 영역에서 처리한다.
 * 이 경계가 맡는 것은 "일어나면 안 되는데 일어난" 렌더링 예외다.
 *
 * 에러 경계는 React 에서 아직 클래스 컴포넌트로만 만들 수 있다.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 콘솔에만 남긴다. 외부 수집 도구를 붙이면 이 자리에 연결한다.
    console.error(
      `[ErrorBoundary${this.props.name ? `: ${this.props.name}` : ""}]`,
      error,
      errorInfo.componentStack,
    );
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;

    if (!error) return children;

    if (fallback) {
      return typeof fallback === "function" ? fallback(this.reset) : fallback;
    }

    return (
      <div className="flex flex-col items-center justify-center gap-4 p-10 text-center">
        <p className="text-lg font-semibold text-gray-900">
          화면을 표시하는 중 문제가 발생했습니다.
        </p>
        <p className="text-sm text-gray-500">
          잠시 후 다시 시도해주세요. 문제가 계속되면 새로고침해주세요.
        </p>
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={this.reset}
            className="px-4 py-2 rounded-md bg-rbPrimaryColor text-white cursor-pointer"
          >
            다시 시도
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            새로고침
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
