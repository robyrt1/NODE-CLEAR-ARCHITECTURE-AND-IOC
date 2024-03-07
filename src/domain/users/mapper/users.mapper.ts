import { Imapper } from './../../@shared/interfaces/mapper.interface';
import { map, omit } from 'lodash';
import { IUsers } from '../entity/user.entity';

type UserPreview = Omit<IUsers,'password'>

export class UsersMapper implements Imapper<IUsers[], UserPreview[]> {
  execute(param: IUsers[]) {
    const users = param;
    const response = (map(users, user => ({ ...omit(user,'password') }))) as UserPreview[];

    return response;
  }
}
