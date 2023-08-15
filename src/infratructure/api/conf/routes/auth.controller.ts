import { IAuthService } from './../../../modules/auth/auth.services';
import { controller, httpGet, httpPost, request, response, next } from 'inversify-express-utils';
import { Response, Request, NextFunction } from 'express';
import { inject } from 'inversify';
import { AUTH_IOC_IDS } from '../../../@shared/constants/IOC/auth.ioc.identifiers';
import { get } from 'lodash';

@controller('/auth')
export class AuthController {
  constructor(
    @inject(AUTH_IOC_IDS.SERVICE)
    private readonly authServices: IAuthService,
  ) {}
  @httpPost('/')
  async getAll(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    const ds_usuario = get(req.body, 'ds_usuario', null);
    const ds_senha = get(req.body, 'ds_senha', null);
    const users = await this.authServices.checkCredentials(ds_usuario, ds_senha);
    res.status(users.statusCode).json(users);
  }
}
