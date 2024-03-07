import { controller, httpGet, httpPost, httpPatch, request, response, next } from 'inversify-express-utils';
import { Response, Request, NextFunction } from 'express';
import { inject } from 'inversify';
import { USERS_IOC_IDS } from '../../../@shared/constants/IOC/users.ioc.identifiers';
import { IUsersServices } from '../../../modules/users/users.services';
import { get } from 'lodash';

@controller('/api/users')
export class UsersController {
  constructor(
    @inject(USERS_IOC_IDS.SERVICE)
    private readonly usersServices: IUsersServices,
  ) {}
  @httpGet('/')
  async getAll(req: Request, res: Response, next: NextFunction) {
    const users = await this.usersServices.getAll();
    res.status(users.statusCode).json(users);
  }
  @httpPost('/')
  async create(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    const users = await this.usersServices.create(req.body);
    res.status(users.statusCode).json(users);
  }

  @httpPatch('/')
  async patch(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    const id = get(req, 'body.id', null);
    const ds_senha = get(req, 'body.ds_senha', null);
    const nm_usuario = get(req, 'body.nm_usuario', null);
    const users = await this.usersServices.patch(id, ds_senha, nm_usuario);
    res.status(users.statusCode).json(users);
  }
}
