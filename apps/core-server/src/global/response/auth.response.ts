import { createErrorResponse, createResponse } from './common';

export const AuthResponse = {
  saveSocialUser: {
    200: createResponse({
      data: {
        token: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJpbmhvbzIzQG5hdmVyLmNvbSIsImlhdCI6MTcxNzUxNjUyMSwiZXhwIjoxNzE3NTIwMTIxfQ.3bRh0fat1ZHZXs5MV1VX5qXBNFK80c4E0CyvaCkL_Uk',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJpbmhvbzIzQG5hdmVyLmNvbSIsImlhdCI6MTcxNzUxNjUyMSwiZXhwIjoxNzE4MTIxMzIxfQ.52Y6y4Z5h6qCtvK7BoNJXwl4XUwN_hIgh2vS5jdhxiY',
        },
        user: {
          nickname: 'Pinomaker',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
          email: 'inhoo23@naver.com',
          fcmToken: 'op973GfpO2U13FbxPed1E5AcgHd2',
        },
        workspace: {
          id: 2,
          name: 'Pinomaker',
          comment: '',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
          uuid: 'be552447-a66a-48dc-aabe-eca8bf69feb6',
          workspaceFunction: [
            {
              id: 3,
              function: 'TICKET',
            },
            {
              id: 4,
              function: 'QA',
            },
          ],
        },
      },
      statusCode: 200,
      message: '회원가입 했습니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '이미 회원가입한 유저 입니다.',
      error: 'BAD REQUEST',
    }),
  },
  loginSocialUser: {
    200: createResponse({
      data: {
        token: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJpbmhvbzIzQG5hdmVyLmNvbSIsImlhdCI6MTcxNzUxNjU1MywiZXhwIjoxNzE3NTIwMTUzfQ.lgk5gSfQ-zi8yjDoZ9mAMQwGaFEgVW03e9BYjGKfAYQ',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJpbmhvbzIzQG5hdmVyLmNvbSIsImlhdCI6MTcxNzUxNjU1MywiZXhwIjoxNzE4MTIxMzUzfQ.4HobpebjhTe1kU4Ln4KjsRonjMINaC4susvY2ss9ASk',
        },
        user: {
          nickname: 'Pinomaker',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
          email: 'inhoo23@naver.com',
          fcmToken: 'op973GfpO2U13FbxPed1E5AcgHd2',
        },
        workspace: [
          {
            id: 2,
            name: 'Pinomaker',
            comment: '',
            profile:
              'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
            uuid: 'be552447-a66a-48dc-aabe-eca8bf69feb6',
            isPersonal: true,
            workspaceFunction: [
              {
                id: 4,
                function: 'QA',
              },
              {
                id: 3,
                function: 'TICKET',
              },
            ],
          },
        ],
      },
      statusCode: 200,
      message: 'Login Successed',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '유저를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
  loginDiceUser: {
    200: createResponse({
      data: {
        token: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbiIsImlhdCI6MTcxNzUxNjQwNywiZXhwIjoxNzE3NTIwMDA3fQ.Q70zFl1yAcgr4gdc-qTIDWaBxRk5bOj9JNm8XJz5dec',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbiIsImlhdCI6MTcxNzUxNjQwNywiZXhwIjoxNzE4MTIxMjA3fQ.u3G4YDUId-qAGOm4ToceE9JZxgjpSWDd5djXwHZvJ1A',
        },
        user: {
          nickname: 'Pinomaker',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
          email: 'admin',
          fcmToken: 'op973GfpO2U13FbxPed1E5AcgHd2',
        },
        workspace: [
          {
            id: 1,
            name: 'Pinomaker',
            comment: '',
            profile:
              'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
            uuid: '8c28b001-f824-4058-bb60-2b8b589031a6',
            isPersonal: true,
            workspaceFunction: [
              {
                id: 2,
                function: 'QA',
              },
              {
                id: 1,
                function: 'TICKET',
              },
            ],
          },
        ],
      },
      statusCode: 200,
      message: 'Login Successed',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '비밀번호가 맞지 않습니다.',
      error: 'BAD REQUEST',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '유저를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
  saveDiceUser: {
    200: createResponse({
      data: {
        token: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbiIsImlhdCI6MTcxNzUxNjI3NywiZXhwIjoxNzE3NTE5ODc3fQ.Uxmwka6Ewbpuq477k17UGBh30ho65Cpqv7XhOXt_GD4',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbiIsImlhdCI6MTcxNzUxNjI3NywiZXhwIjoxNzE4MTIxMDc3fQ.v7orh1twskfUC-hyGtaPq9gZSptKqlruRE_1VlhSOHI',
        },
        user: {
          nickname: 'Pinomaker',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
          email: 'admin',
          fcmToken: 'op973GfpO2U13FbxPed1E5AcgHd2',
        },
        workspace: {
          id: 1,
          name: 'Pinomaker',
          comment: '',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
          uuid: '8c28b001-f824-4058-bb60-2b8b589031a6',
          workspaceFunction: [
            {
              id: 1,
              function: 'TICKET',
            },
            {
              id: 2,
              function: 'QA',
            },
          ],
        },
      },
      statusCode: 200,
      message: '회원가입 했습니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '이미 회원가입한 유저 입니다.',
      error: 'BAD REQUEST',
    }),
  },
  reissueToken: {
    200: createResponse({
      data: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk1NTcxMjM2LCJleHAiOjE2OTU1NzQ4MzZ9.IAu_paMVmVSrPtNPfi4lNTUw9kIHBWEo8If9WbCxcBY',
      },
      statusCode: 200,
      message: '토큰을 재발급합니다.',
    }),
  },
};
