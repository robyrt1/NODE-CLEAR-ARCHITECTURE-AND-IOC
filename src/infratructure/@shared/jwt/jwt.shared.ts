import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { IJwt } from "../interfaces/jwt";
import { HTTPCODE } from "../constants/httpCode";
import { injectable } from "inversify";

@injectable()
export class JwtShared implements IJwt {
  genereted(data: string | object | Buffer) {
    try {
      const expireIn = process.env.JWT_EXPIRES_IN;
      const secret = process.env.JWT_SECRET;
      return jwt.sign(data, secret, { expiresIn: expireIn });
    } catch (err) {
      throw {
        statusCode: HTTPCODE.INTERNAL_SERVER_ERROR,
        err,
      };
    }
  }

  verify(token: string) {
    let result;
    try {
      const secret = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secret);

      result = { isValidToken: true, data: decoded };
    } catch (err) {
      result = { isValidToken: false, err };
    }
    return result;
  }
}
