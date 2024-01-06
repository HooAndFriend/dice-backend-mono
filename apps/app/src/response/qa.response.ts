import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
  createPaginationResponse,
} from './common';

export const QaResponse = {
  findQa: {
    200: createPaginationResponse({
      data: {
        qa: [
          {
            qaid: 1,
            number: 'ISSUE_01',
            status: 'DONE',
            title: 'qa 제목입니다',
            admin: {
              adminId: 'qwer1234',
              nickname: '임동현',
              profile:
                'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
            },
            worker: {
              workerId: 'asdf1234',
              nickname: '김기덕',
              profile:
                'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
            },
            files: [
              {
                fileid: 1,
                url: 'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
              },
            ],
            asIs: '문제사항입니다',
            toBe: '기대결과입니다',
            memo: '메모입니다',
            createdDate: '2023-11-20 13:23:10',
            modifiedDate: '2023-11-20 13:23:10',
          },
        ],
      },
      count: 1,
      statusCode: 200,
      message: 'qa 리스트를 조회합니다.',
    }),
  },
  findQaDetail: {
    200: createPaginationResponse({
      data: {
        qa: [
          {
            qaid: 1,
            number: 'ISSUE_01',
            status: 'DONE',
            title: 'qa 제목입니다',
            admin: {
              adminId: 'qwer1234',
              nickname: '임동현',
              profile:
                'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
            },
            worker: {
              workerId: 'asdf1234',
              nickname: '김기덕',
              profile:
                'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
            },
            files: [
              {
                fileid: 1,
                url: 'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
              },
            ],
            asIs: '문제사항입니다',
            toBe: '기대결과입니다',
            memo: '메모입니다',
            createdDate: '2023-11-20 13:23:10',
            modifiedDate: '2023-11-20 13:23:10',
          },
        ],
      },
      count: 1,
      statusCode: 200,
      message: 'qa 상세로 리스트를 조회합니다.',
    }),
  },
  saveQa: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Qa를 생성합니다.',
    }),
  },
  updateQa: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Qa를 수정합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'qa 정보를 찾을 수 없습니다.',
    }),
  },
  updateStatusQa: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Qa 상태를 수정합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'qa 정보를 찾을 수 없습니다.',
    }),
  },
  deleteQa: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Qa를 삭제합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'qa 정보를 찾을 수 없습니다.',
    }),
  },
  findQaComment: {
    200: createPaginationResponse({
      data: {
        qaComment: [
          {
            commentId: 1,
            user : {
              profile : 'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
              nickname : '임동현',
              content : '댓글 내용입니다.',
              createdDate: '2023-11-20 13:23:10',
              modifiedDate: '2023-11-20 13:23:10',
            }
          },
        ],
      },
      count: 1,
      statusCode: 200,
      message: 'qa 댓글을 조회합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'qa 댓글 정보를 찾을 수 없습니다.',
    }),
  },
  saveQaComment: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Qa 댓글을 생성합니다.',
    }),
  },
  updateQaComment: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Qa 댓글을 수정합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'qa 정보를 찾을 수 없습니다.',
    }),
  },
  deleteQaComment: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Qa를 삭제합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'qa 정보를 찾을 수 없습니다.',
    }),
  },
};
