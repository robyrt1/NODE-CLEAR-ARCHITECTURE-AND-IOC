import { IAuthService } from './../../../modules/auth/auth.services';
import { controller, httpGet, httpPost, request, response, next } from 'inversify-express-utils';
import { Response, Request, NextFunction } from 'express';
import { inject } from 'inversify';
import { AUTH_IOC_IDS } from '../../../@shared/constants/IOC/auth.ioc.identifiers';
import { get } from 'lodash';
import { HTTPCODE } from '../../../@shared/constants/httpCode';

@controller('/api/auth')
export class AuthController {
  constructor(
    @inject(AUTH_IOC_IDS.SERVICE)
    private readonly authServices: IAuthService,
  ) {}
  @httpPost('/signin')
  async signin(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    const user_name = get(req.body, 'user_name', null);
    const password = get(req.body, 'password', null);
    const users = await this.authServices.checkCredentials(user_name, password);
    res.status(users.statusCode).json(users);
  }

  @httpPost('/signout')
  async logout(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    res.status(HTTPCODE.OK).json(true);
  }
}