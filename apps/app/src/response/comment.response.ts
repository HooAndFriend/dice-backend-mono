import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
  createPaginationResponse,
} from './common';

export const CommentResponse = {
  findComment: {
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
  },
  saveComment: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Qa 댓글을 생성합니다.',
    }),
  },
  updateComment: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Qa 댓글을 수정합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'qa 댓글 정보를 찾을 수 없습니다.',
    }),
  },
  deleteComment: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Qa를 삭제합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      error: 'NOT FOUND',
      message: 'qa 댓글 정보를 찾을 수 없습니다.',
    }),
  },
};
