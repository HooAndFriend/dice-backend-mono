export interface JwtPayload {
  id: number;
  iat?: number;
  exp?: number;
}

export interface CommonResponseType {
  statusCode: number;
  message: string;
  data?: T;
  count?: number;
}
