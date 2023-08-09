import { IHttpResponseMappingHandler } from "../interfaces/httpResponseMappingHandlerInterface";

export const httpResponseMappingHandler = <T>(
    status: boolean,
    message: string,
    data: T,
    statusCode?: number,
    success?:string
): IHttpResponseMappingHandler<T> => {
    return { status, message, statusCode,success,data};
};
