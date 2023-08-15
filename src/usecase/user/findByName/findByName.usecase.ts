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
      nm_usuario: users.nm_usuario,
      ds_usuario: users.ds_usuario,
      ds_senha: users.ds_senha,
      cd_pessoa_fisica: users.cd_pessoa_fisica,
    };
  }
}

export interface IUsersFindByNameUseCase {
  execute(param: IFindByNameUseCaseInputDto): Promise<IFindByNameUseCaseCaseOutputDto>;
}
