import { isAxiosError } from "axios";

export const NETWORK_ERROR_MESSAGE = "네트워크 연결을 확인해주세요.";
export const UNKNOWN_ERROR_MESSAGE = "알 수 없는 오류가 발생했습니다.";

// 백엔드 공통 에러 응답 (global/exception/ErrorResponse)
type ServerErrorBody = {
  errorCode?: string;
  message?: string;
};

/**
 * 앱 전체에서 쓰는 단일 에러 타입.
 *
 * axios 의 에러는 보여줄 문구가 error.response.data.message 깊숙이 있고,
 * 서버에 닿지 못하면 response 자체가 없어 호출부마다 같은 분기를 반복해야 했다.
 * 인터셉터에서 한 번만 이 타입으로 변환해, 이후 코드는 message 하나만 보면 된다.
 */
export class ApiError extends Error {
  /** 백엔드 에러 코드 ("M400" 등). 서버 응답이 없으면 null */
  readonly errorCode: string | null;
  /** HTTP 상태 코드. 서버에 닿지 못했으면 null */
  readonly status: number | null;

  constructor({
    message,
    errorCode = null,
    status = null,
  }: {
    message: string;
    errorCode?: string | null;
    status?: number | null;
  }) {
    super(message);
    this.name = "ApiError";
    this.errorCode = errorCode;
    this.status = status;
  }

  /** 서버 응답을 받지 못한 경우 (연결 끊김, 타임아웃, CORS 차단 등) */
  get isNetworkError() {
    return this.status === null;
  }

  /** message 에는 서버가 준 문구를 그대로 담는다. 없으면 기본 문구로 대체한다. */
  static from(error: unknown): ApiError {
    if (error instanceof ApiError) return error;

    if (isAxiosError(error)) {
      const body = error.response?.data as ServerErrorBody | undefined;
      return new ApiError({
        message:
          body?.message ??
          (error.response ? UNKNOWN_ERROR_MESSAGE : NETWORK_ERROR_MESSAGE),
        errorCode: body?.errorCode ?? null,
        status: error.response?.status ?? null,
      });
    }

    return new ApiError({
      message: error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE,
    });
  }
}
