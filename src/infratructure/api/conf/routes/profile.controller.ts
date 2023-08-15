import { inject } from 'inversify';
import { controller, httpGet, httpPost, request, response, next } from 'inversify-express-utils';
import { Request, Response, NextFunction } from 'express';
import { PROFILE_IOC_IDS } from '../../../@shared/constants/IOC/profile.ioc.identifiers';
import { IProfileServices } from '../../../modules/profile/profile.services';
import { get } from 'lodash';

@controller('/profile')
export class ProfileController {
  constructor(@inject(PROFILE_IOC_IDS.SERVICE) private profileServices: IProfileServices) {}

  @httpPost('/')
  async createProfile(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    const nm_perfil = get(req.body, 'nm_perfil', null);
    const profile = await this.profileServices.createProfile(nm_perfil);
    res.status(profile.statusCode).json(profile);
  }
}
