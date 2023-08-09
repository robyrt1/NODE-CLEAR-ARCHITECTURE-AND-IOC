import { injectable } from "inversify";
import sha1 from "sha1";

export class CryptographyShared {
   static compare(passaworFromRequest: string, passwordHash: string) {
    try {
      const result = passaworFromRequest === passwordHash ? true : false;
      return result;
    } catch (error) {
      throw { statuscode: "", error };
    }
  }

  static hash(data: string) {
    try {
      return sha1(data);
    } catch (error) {
      throw { statuscode: "", error };
    }
  }
}
