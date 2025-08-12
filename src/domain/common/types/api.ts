export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  sucsess: boolean;
}
