export interface ApiResponse<T> {
  data: T;
  message: string;
  sucsess: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}
