import { createErrorResponse, createResponse } from './common';

export const FileResponse = {
  uploadFile: {
    200: createResponse({
      data: {
        ETag: '"c7d685ae5f024429f03687c17ed3d775"',
        Location: 'http://125.133.34.224:9000/file/Github.png',
        key: 'Github.png',
        Key: 'Github.png',
        Bucket: 'file',
        url: 'https://file.hi-dice.com/file//Github.png',
      },
      statusCode: 200,
      message: 'Success Upload File',
    }),
  },
};
