// ** Nest Imports
import { HttpStatus } from '@nestjs/common';

export class CommonResponse<T> {
  private constructor(payload: {
    readonly data?: T;
    readonly statusCode: number;
    readonly message: string;
    readonly count?: number;
  }) {
    this.data = payload?.data;
    this.statusCode = payload.statusCode;
    this.message = payload.message;
    this.count = payload?.count;
  }

  public readonly data?: T;

  public readonly statusCode: HttpStatus;

  public readonly message: string;

  public readonly count?: number;

  static createResponseMessage<T>(payload: {
    readonly statusCode: number;
    readonly message: string;
  }): CommonResponse<T> {
    return new CommonResponse<T>({
      statusCode: payload.statusCode,
      message: payload.message,
    });
  }

  static createResponse<T>(payload: {
    readonly statusCode: number;
    readonly message: string;
    readonly data: T;
  }): CommonResponse<T> {
    return new CommonResponse<T>({
      data: payload.data,
      statusCode: payload.statusCode,
      message: payload.message,
    });
  }

  static createPaginationResponse<T>(payload: {
    readonly statusCode: number;
    readonly message: string;
    readonly data: T;
    readonly count: number;
  }): CommonResponse<T> {
    return new CommonResponse<T>({
      data: payload.data,
      statusCode: payload.statusCode,
      message: payload.message,
      count: payload.count,
    });
  }
}
