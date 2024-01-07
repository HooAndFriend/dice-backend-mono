import {
  createErrorResponse,
  createMessageResponse,
  createPaginationResponse,
  createResponse,
} from './common';

export const WorkspaceFunctionResponse = {
  findWorkspaceFunctionList: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Find Workspace Function List',
    }),
  },
};
