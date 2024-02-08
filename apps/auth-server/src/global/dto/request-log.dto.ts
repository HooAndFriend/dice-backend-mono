export default class RequestLogDto {
  requestUrl: string;
  requestParams: string;
  requestBody: string;
  requestMethod: string;
  responseBody: string;
  serverName: string;
  ip: string;
  userId: string;
}
