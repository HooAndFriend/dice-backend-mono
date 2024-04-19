import {
  createErrorResponse,
  createResponse,
  createMessageResponse,
} from './common';
export const TicketHistoryLogResponse = {
  findTicketHistoryList: {
    200: createResponse({
      data: {
        data: [
          {
            createdDate: '2024-04-19T03:53:38.553Z',
            id: '1',
            ticketId: 1,
            username: 'admin',
            subUsername: 'admin2',
            type: 'DUE_DATE',
            after: '123',
            before: '123',
            log: '123',
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: 'Find Ticket History List',
    }),
  },
};
