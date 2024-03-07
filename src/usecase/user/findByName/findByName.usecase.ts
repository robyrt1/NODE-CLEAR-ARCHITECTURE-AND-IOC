import { inject, injectable } from 'inversify';
import { USERS_IOC_IDS } from '../../../infratructure/@shared/constants/IOC/users.ioc.identifiers';
import { IUserRepositoryInterface } from '../../../domain/users/repository/user.repository';
import { head } from 'lodash';
import { IFindByNameUseCaseCaseOutputDto, IFindByNameUseCaseInputDto } from './findByName.usecase.dto';

@injectable()
export class UsersFindByNameUseCase {
  constructor(@inject(USERS_IOC_IDS.REPOSITORY) private usersRepository: IUserRepositoryInterface) {}

  async execute({ name }: IFindByNameUseCaseInputDto): Promise<IFindByNameUseCaseCaseOutputDto> {
    const users = await this.usersRepository.findByName(name);
    const shouldNotUsers = !!head([users]);
    if (!shouldNotUsers) throw `Não existe este usuário.`;

    return {
      id: users.id,
      user_name: users.user_name,
      sunname: users.sunname,
      password: users.password,
    };
  }
}

export interface IUsersFindByNameUseCase {
  execute(param: IFindByNameUseCaseInputDto): Promise<IFindByNameUseCaseCaseOutputDto>;
}
