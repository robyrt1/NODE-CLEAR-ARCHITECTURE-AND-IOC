import { map } from 'lodash';
import { Imapper } from '../../@shared/interfaces/mapper.interface';
import { IUsers } from '../entity/user.entity';

export class UsersMapper implements Imapper<IUsers[], IUsers[]> {
  execute(param: IUsers[]): IUsers[] {
    const users = param;
    const response = map(users, user => ({ ...user }));

    return response;
  }
}
