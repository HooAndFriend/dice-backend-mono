// ** Nest Imports
import { HttpStatus, NotFoundException } from '@nestjs/common';

// ** Exceptio Imports
import { BadRequestException } from '../exception/CustomException';

export default class CommonResponse<T> {
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

  static createNotFoundException<T>(message: string): CommonResponse<T> {
    throw new NotFoundException(message);
  }

  static createBadRequestException<T>(message: string): CommonResponse<T> {
    throw new BadRequestException(message);
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
