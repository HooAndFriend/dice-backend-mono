import {
  createErrorResponse,
  createMessageResponse,
  createPaginationResponse,
  createResponse,
} from './common';

export const WorkspaceFunctionResponse = {
  findWorkspaceFunctionList: {
    200: createResponse({
      data: {
        data: [
          {
            function: 'TICKET',
            isUse: true,
          },
          {
            function: 'QA',
            isUse: false,
          },
          {
            function: 'COLLECTION',
            isUse: false,
          },
          {
            function: 'ERD',
            isUse: false,
          },
        ],
        count: 4,
      },
      statusCode: 200,
      message: 'Find Workspace Function List',
    }),
  },
  findFunctionList: {
    200: createResponse({
      data: {
        data: [
          {
            id: 1,
            function: 'TICKET',
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: 'Find Workspace Function List',
    }),
  },
  saveWorkspaceFunction: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Save Workspace Function',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: 'This Function is Existed',
      error: 'BAD REQUEST',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'Not Found Workspace',
      error: 'NOT FOUND',
    }),
  },
};