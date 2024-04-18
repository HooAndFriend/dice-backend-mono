import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
  createPaginationResponse,
} from './common';

export const NotificationResponse = {
  findNotificationList: {
    200: createResponse({
      data: {
        data: [
          {
            createdDate: '2024-04-18T11:55:00.419Z',
            modifiedDate: '2024-04-18T11:55:00.419Z',
            id: 1,
            email: 'admin',
            title: 'QA 담당자 변경',
            body: 'admin123님이 QA 담당자로 지정하였습니다.',
            status: 'UNREAD',
            type: 'QA',
            subId: 36,
          },
          {
            createdDate: '2024-04-18T11:55:12.905Z',
            modifiedDate: '2024-04-18T11:55:12.905Z',
            id: 2,
            email: 'admin',
            title: 'QA 담당자 변경',
            body: 'admin123님이 QA 담당자로 지정하였습니다.',
            status: 'UNREAD',
            type: 'QA',
            subId: 36,
          },
        ],
        count: 2,
      },
      statusCode: 200,
      message: 'Notification Found',
    }),
  },
  updateNotificationAllStatus: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Update Notification',
    }),
  },
  updateNotificationStatus: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Update Notification',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '해당 알림을 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
};
