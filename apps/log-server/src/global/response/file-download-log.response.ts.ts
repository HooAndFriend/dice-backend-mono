import {
  createErrorResponse,
  createResponse,
  createMessageResponse,
} from './common';
export const FileDownloadLogResponse = {
  saveFileDownloadLog: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'File Download Log Saved Successfully',
    }),
  },
};
