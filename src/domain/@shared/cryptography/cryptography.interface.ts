interface ICryptography {
  compare(passaworFromRequest: string, passwordHash: string): Promise<any>;
  hash(data: string): any;
}
