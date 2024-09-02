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
            createdDate: '2024-08-21T06:33:18.389Z',
            ticketHistoryLogId: '1',
            ticketId: 1,
            creatorEmail: 'admin',
            creatorNickname: 'admin',
            creatorProfile:
              'https://file.hi-dice.com/file//20240813111450-314631462_1719969028389444_6312286304904119979_n.jpg',
            type: 'UPDATE_NAME',
            beforeLog: 'name',
            beforeEmail: null,
            beforeNickname: null,
            beforeProfile: null,
            afterLog: 'NAME',
            afterEmail: null,
            afterNickname: null,
            afterProfile: null,
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: 'Find Ticket History List',
    }),
  },
};
