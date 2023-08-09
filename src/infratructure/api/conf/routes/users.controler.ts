import {
  controller,
  httpGet,
  httpPost,
  request,
  response,
  next
} from "inversify-express-utils";
import { Response, Request, NextFunction } from "express";
import { inject } from "inversify";
import { USERS_IOC_IDS } from "../../../@shared/constants/IOC/users.ioc.identifiers";
import { IUsersServices } from "../../../modules/users/users.services";

@controller("/users")
export class UsersController {
  constructor(
    @inject(USERS_IOC_IDS.SERVICE)
    private readonly usersServices: IUsersServices
  ) {}
  @httpGet("/")
  async getAll(req: Request, res: Response, next: NextFunction) {
    const users = await this.usersServices.getAll();
    res.status(users.statusCode).json(users);
  }
  @httpPost("/")
  async create(
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    const users = await this.usersServices.create(req.body);
    res.status(users.statusCode).json(users);
  }
}
