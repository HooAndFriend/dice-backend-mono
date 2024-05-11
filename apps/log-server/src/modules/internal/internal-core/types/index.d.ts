export interface UserProfile {
  email: string;
  nickname: string;
  profile: string;
}

export interface InternalResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
}
