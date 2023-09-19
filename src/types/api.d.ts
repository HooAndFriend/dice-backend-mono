export interface Response {
  fakeCode?: number;
  statusCode: number;
  message: string;
  description?: string;
}

export interface SuccessResponse extends Response {
  data: any;
  statusCode: 201 | 200;
}

export interface PaginationResponse extends Response {
  data: any;
  count: number;
  statusCode: 201 | 200;
}

export interface ErrorResponse extends Response {
  error: 'BAD REQUEST' | 'NOT FOUND';
}

export type MessageRespons = Response;
