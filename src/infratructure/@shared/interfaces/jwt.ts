export interface IJwt {
  genereted(data: string | object | Buffer): any;
  verify(token: string): any;
}
