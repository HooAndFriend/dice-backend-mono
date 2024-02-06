import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const AdminResponse = {
  saveAdmin: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Admin을 생성했습니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '이미 존재하는 이메일입니다.',
      error: 'BAD REQUEST',
    }),
  },
  findAdminList: {
    200: createResponse({
      data: {
        data: [
          {
            createdAt: '2024-02-06T09:57:47.956Z',
            id: 2,
            email: 'subAdmin',
            role: 'MASTER',
            nickname: '피노키오',
            profile: 'https://s3.bucket.com/123.png',
          },
          {
            createdAt: '2024-02-06T05:49:57.188Z',
            id: 1,
            email: 'admin',
            role: 'MASTER',
            nickname: 'ADMIN',
            profile: '',
          },
        ],
        count: 2,
      },
      statusCode: 200,
      message: 'Admin 리스트를 조회했습니다.',
    }),
  },
  findAdmin: {
    200: createResponse({
      data: {
        createdAt: '2024-02-06T05:49:57.188Z',
        updatedAt: '2024-02-06T05:49:57.188Z',
        id: 1,
        email: 'admin',
        password:
          '$2a$10$iM8h/1wR.hW/5t9cuvu5Ju8SP6Ya7L0JQve3WB2TCqVOYy.fZVEeO',
        role: 'MASTER',
        nickname: 'ADMIN',
        profile: '',
        createdId: '',
      },
      statusCode: 200,
      message: 'Admin을 조회했습니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '존재하지 않는 관리자입니다.',
      error: 'NOT FOUND',
    }),
  },
  deleteAdmin: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Admin을 삭제했습니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '존재하지 않는 관리자입니다.',
      error: 'NOT FOUND',
    }),
  },
  updateAdmin: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Admin을 수정했습니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '존재하지 않는 관리자입니다.',
      error: 'NOT FOUND',
    }),
  },
};
