import { get } from 'lodash';
import { IHttpResponseMappingHandler } from '../interfaces/httpResponseMappingHandlerInterface';
import { HTTPCODE } from '../constants/httpCode';

export const httpResponseMappingHandler = <T>(
  status: boolean,
  message: string,
  data: T,
  statusCode?: number,
  success?: string,
): IHttpResponseMappingHandler<T> => {
  return { status, message, statusCode, success, data };
};

export const httpResponseMappingHandlerError = (error: Error): IHttpResponseMappingHandler<[]> => {
  const messageFail = get(error, 'message', error) as any;
  const statusCode = get(error, 'statusCode', HTTPCODE.INTERNAL_SERVER_ERROR);
  return httpResponseMappingHandler(false, messageFail, [], statusCode, 'fail');
};
