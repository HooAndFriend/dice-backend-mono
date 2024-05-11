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
            createdDate: '2024-05-07T12:24:38.434Z',
            id: '31',
            ticketId: 317,
            email: 'yoonalim2003@gmail.com',
            type: 'STATUS',
            log: 'DOING -> COMPLETE',
            user: {
              email: 'yoonalim2003@gmail.com',
              nickname: '유나낭',
              profile:
                'https://file.hi-dice.com/dice-dev/d859a4892dfc1d7d4e12c1e748a8ad93.jpg',
            },
          },
          {
            createdDate: '2024-05-07T11:40:09.146Z',
            id: '30',
            ticketId: 317,
            email: 'yoonalim2003@gmail.com',
            type: 'DUE_DATE',
            log: '2024-05-06 -> 2024-05-07',
            user: {
              email: 'yoonalim2003@gmail.com',
              nickname: '유나낭',
              profile:
                'https://file.hi-dice.com/dice-dev/d859a4892dfc1d7d4e12c1e748a8ad93.jpg',
            },
          },
          {
            createdDate: '2024-05-07T11:40:05.417Z',
            id: '29',
            ticketId: 317,
            email: 'yoonalim2003@gmail.com',
            type: 'DUE_DATE',
            log: '2024-05-05 -> 2024-05-06',
            user: {
              email: 'yoonalim2003@gmail.com',
              nickname: '유나낭',
              profile:
                'https://file.hi-dice.com/dice-dev/d859a4892dfc1d7d4e12c1e748a8ad93.jpg',
            },
          },
          {
            createdDate: '2024-05-07T11:39:55.813Z',
            id: '28',
            ticketId: 317,
            email: 'yoonalim2003@gmail.com',
            type: 'STATUS',
            log: 'NOTHING -> DOING',
            user: {
              email: 'yoonalim2003@gmail.com',
              nickname: '유나낭',
              profile:
                'https://file.hi-dice.com/dice-dev/d859a4892dfc1d7d4e12c1e748a8ad93.jpg',
            },
          },
        ],
        count: 4,
      },
      statusCode: 200,
      message: 'Find Ticket History List',
    }),
  },
};
