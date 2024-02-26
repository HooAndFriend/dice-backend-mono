import {
    createErrorResponse,
    createMessageResponse,
    createResponse,
    createPaginationResponse,
  } from './common';
  
  export const QaResponse = {
    findQaList: {
      200: createPaginationResponse({
        data: {
          qa: [
            {
              id: 1,
              number: 'ISSUE_01',
              status: 'DONE',
              title: 'qa 제목입니다',
              admin: {
                adminId: 'qwer1234',
                nickname: '임동현',
                profile:
                  'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
              },
              file: [
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
  };
  