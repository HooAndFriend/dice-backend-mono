import { createErrorResponse, createResponse } from './common';

export const AuthResponse = {
  saveSocialUser: {
    200: createResponse({
      data: {
        token: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJpbmhvMTIzbzIyM0BuYXZlci5jb20iLCJpYXQiOjE3MTc4MzMzNTUsImV4cCI6MTcxNzgzNjk1NX0.xf5uBVHJ-yRbfUiW4AX5p0W1wrppTvLwhJNJgabvGRY',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJpbmhvMTIzbzIyM0BuYXZlci5jb20iLCJpYXQiOjE3MTc4MzMzNTUsImV4cCI6MTcxODQzODE1NX0.C732RrPfuUIX89P1BMLTbqefGneOLyafT8PTi4slxG4',
        },
        user: {
          userId: 1,
          nickname: 'Pinomaker',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
          email: 'inho123o223@naver.com',
          fcmToken: 'op973GfpO2U13FbxPed1E5AcgHd2',
        },
        workspace: {
          workspaceId: 6,
          name: 'Pinomaker',
          comment: '',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
          uuid: '1f71587c-2ecf-40c3-9c4a-bb759af8f397',
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
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJpbmhvbzIzQG5hdmVyLmNvbSIsImlhdCI6MTcxNzgzMzM4MiwiZXhwIjoxNzE3ODM2OTgyfQ.mM9RL5DVHULUUksvjK9zg26lnVV-b7NcjvHZ86CRpDY',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJpbmhvbzIzQG5hdmVyLmNvbSIsImlhdCI6MTcxNzgzMzM4MiwiZXhwIjoxNzE4NDM4MTgyfQ.IKbpM9J4g3VdOjeYcuO2vwWeFUg3zfGLLIpJPpGSr40',
        },
        user: {
          userId: 1,
          nickname: 'Pinomaker',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
          email: 'inhoo23@naver.com',
          fcmToken: 'op973GfpO2U13FbxPed1E5AcgHd2',
        },
        workspace: [
          {
            workspaceId: 2,
            name: 'Pinomaker',
            comment: '',
            profile:
              'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
            uuid: 'be552447-a66a-48dc-aabe-eca8bf69feb6',
            isPersonal: true,
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
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbiIsImlhdCI6MTcxNzgzMzA2NywiZXhwIjoxNzE3ODM2NjY3fQ.6YSBAge3huOgf1C45A-yx6ir9kxcd-hVpfXM-4YULRU',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbiIsImlhdCI6MTcxNzgzMzA2NywiZXhwIjoxNzE4NDM3ODY3fQ.BKnJ1ObkUrZWI2Tt7F9a6b_Xzva249L5HlviUWH9jOQ',
        },
        user: {
          userId: 1,
          nickname: 'Pinomaker',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
          email: 'admin',
          fcmToken:
            'c4S-OSrWtXXFo6ptFTF-SJ:APA91bGSJvdFT0tSCc0D49FwJl66F3h_eFNGBrGv7yfHC2FG2jYZYI_XmYT3CGtvQIpcnlUuN67jlcWK3EXkW7Hy6uhCCQr_INRs2jynpuB3ewOVw6yizJ-ydpeQeQJu3HDefmkaFgzG',
        },
        workspace: [
          {
            workspaceId: 1,
            name: 'Pinomaker',
            comment: '',
            profile:
              'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
            uuid: '8c28b001-f824-4058-bb60-2b8b589031a6',
            isPersonal: true,
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
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZG1pbjMzNCIsImlhdCI6MTcxNzgzMzIyMCwiZXhwIjoxNzE3ODM2ODIwfQ.MMIl4Pam5PvUGChzbAoEpEtFptj1HTPsSZi0VJjwlZY',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZG1pbjMzNCIsImlhdCI6MTcxNzgzMzIyMCwiZXhwIjoxNzE4NDM4MDIwfQ.uwC6eci5R5rhm4dKl7JKiJxz1o_Yq2lsZiAjipYXv04',
        },
        user: {
          userId: 1,
          nickname: 'Pinomaker',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
          email: 'admin334',
          fcmToken: 'op973GfpO2U13FbxPed1E5AcgHd2',
        },
        workspace: {
          workspaceId: 4,
          name: 'Pinomaker',
          comment: '',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
          uuid: 'e872b611-b57d-47ac-a9a7-4476753a9eba',
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
