import { createErrorResponse, createResponse } from './common';

export const AuthResponse = {
  saveSocialUser: {
    200: createResponse({
      data: {
        token: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA3NjU1NzA0LCJleHAiOjE3MDc2NTkzMDR9.qEzz11nqTZCP1el-HIsr0PePKgUXbHgiW4Tnaqw7pmQ',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA3NjU1NzA0LCJleHAiOjE3MDgyNjA1MDR9.W4dG8Bcis1VrRqgcWzTArShh1xdQ8ey2ekY61ce1FTA',
        },
        user: {
          nickname: 'admin',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
          email: 'admin',
          fcmToken: '',
        },
        team: {
          id: 3,
          name: 'admin',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
          uuid: 'd1e6e485-7504-40da-bf81-1299840fedb9',
          description: '',
          workspace: [
            {
              id: 3,
              name: 'admin',
              comment: '',
              profile:
                'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
              uuid: '88c03bbf-ca24-4e32-a689-4c4e508caad4',
              workspaceFunction: [],
            },
          ],
        },
      },
      statusCode: 200,
      message: 'Login Successed',
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
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA3NjU1NzA0LCJleHAiOjE3MDc2NTkzMDR9.qEzz11nqTZCP1el-HIsr0PePKgUXbHgiW4Tnaqw7pmQ',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA3NjU1NzA0LCJleHAiOjE3MDgyNjA1MDR9.W4dG8Bcis1VrRqgcWzTArShh1xdQ8ey2ekY61ce1FTA',
        },
        user: {
          nickname: 'admin',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
          email: 'admin',
          fcmToken: '',
        },
        team: {
          id: 3,
          name: 'admin',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
          uuid: 'd1e6e485-7504-40da-bf81-1299840fedb9',
          description: '',
          workspace: [
            {
              id: 3,
              name: 'admin',
              comment: '',
              profile:
                'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
              uuid: '88c03bbf-ca24-4e32-a689-4c4e508caad4',
              workspaceFunction: [],
            },
          ],
        },
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
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA3NjU1NzA0LCJleHAiOjE3MDc2NTkzMDR9.qEzz11nqTZCP1el-HIsr0PePKgUXbHgiW4Tnaqw7pmQ',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA3NjU1NzA0LCJleHAiOjE3MDgyNjA1MDR9.W4dG8Bcis1VrRqgcWzTArShh1xdQ8ey2ekY61ce1FTA',
        },
        user: {
          nickname: 'admin',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
          email: 'admin',
          fcmToken: '',
        },
        team: {
          id: 3,
          name: 'admin',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
          uuid: 'd1e6e485-7504-40da-bf81-1299840fedb9',
          description: '',
          workspace: [
            {
              id: 3,
              name: 'admin',
              comment: '',
              profile:
                'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
              uuid: '88c03bbf-ca24-4e32-a689-4c4e508caad4',
              workspaceFunction: [],
            },
          ],
        },
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
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA3NjU1NzA0LCJleHAiOjE3MDc2NTkzMDR9.qEzz11nqTZCP1el-HIsr0PePKgUXbHgiW4Tnaqw7pmQ',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA3NjU1NzA0LCJleHAiOjE3MDgyNjA1MDR9.W4dG8Bcis1VrRqgcWzTArShh1xdQ8ey2ekY61ce1FTA',
        },
        user: {
          nickname: 'admin',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
          email: 'admin',
          fcmToken: '',
        },
        team: {
          id: 3,
          name: 'admin',
          profile:
            'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
          uuid: 'd1e6e485-7504-40da-bf81-1299840fedb9',
          description: '',
          workspace: [
            {
              id: 3,
              name: 'admin',
              comment: '',
              profile:
                'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
              uuid: '88c03bbf-ca24-4e32-a689-4c4e508caad4',
              workspaceFunction: [],
            },
          ],
        },
      },
      statusCode: 200,
      message: 'Login Successed',
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
