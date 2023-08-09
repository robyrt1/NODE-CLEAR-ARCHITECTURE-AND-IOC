export interface IHttpResponseMappingHandler <T> {
    status:boolean;
    message:string;
    data: T ,
    statusCode?: number;
    success?:string
}