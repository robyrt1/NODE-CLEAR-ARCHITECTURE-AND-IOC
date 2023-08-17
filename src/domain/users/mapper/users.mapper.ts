import { Imapper } from './../../@shared/interfaces/mapper.interface';
import { map } from 'lodash';
import { IUsers } from '../entity/user.entity';

export class UsersMapper implements Imapper<IUsers[], IUsers[]> {
  execute(param: IUsers[]): IUsers[] {
    const users = param;
    const response = map(users, user => ({ ...user }));

    return response;
  }
}
