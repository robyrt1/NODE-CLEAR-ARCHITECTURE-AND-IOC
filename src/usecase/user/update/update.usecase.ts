import { ICreateUseCaseOutputDto, ICreateUseCaseInputDto } from './../create/create.usecase.dto';
import { inject, injectable } from 'inversify';
import { USERS_IOC_IDS } from '../../../infratructure/@shared/constants/IOC/users.ioc.identifiers';
import { IUserRepositoryInterface } from '../../../domain/users/repository/user.repository';
import { IUsersFactory } from '../../../domain/users/factory/users.factory';
import { IUsersUpdateUseCaseInputDto, IUsersUpdateUseCaseOutPutDto } from './update.usecase.dto';
import { defaultTo, head } from 'lodash';
import { HTTPCODE } from '../../../infratructure/@shared/constants/httpCode';
import { Users } from '../../../domain/users/entity/user.entity';

@injectable()
export class UsersUpdateUseCase implements IUsersUpdateUseCase {
  constructor(
    @inject(USERS_IOC_IDS.REPOSITORY)
    private usersRepository: IUserRepositoryInterface,
  ) {}

  async execute({
    id,
    nm_usuario: nm_usuario_request,
    ds_usuario: ds_usuario_request,
  }: IUsersUpdateUseCaseInputDto): Promise<IUsersUpdateUseCaseOutPutDto> {
    const shouldUser = await this.usersRepository.getByProp('nr_sequencia', [id as never]);
    const shouldNotUser = !!head([shouldUser]);

    if (!shouldNotUser) throw { statusCode: HTTPCODE.BAD_REQUEST, message: 'Usuario não existe.' };

    const nmUsuario = defaultTo(nm_usuario_request, shouldUser.nm_usuario);
    const dsUsuario = defaultTo(ds_usuario_request, shouldUser.ds_usuario);
    const dataUpdate = new Users(id, nmUsuario, dsUsuario, shouldUser.cd_pessoa_fisica);

    await this.usersRepository.update(Number(id), dataUpdate);

    return {
      id,
      nm_usuario: dataUpdate.nm_usuario,
      ds_usuario: dataUpdate.ds_usuario,
      ds_senha: shouldUser.ds_senha,
      cd_pessoa_fisica: shouldUser.cd_pessoa_fisica,
    };
  }
}

export interface IUsersUpdateUseCase {
  execute(param: IUsersUpdateUseCaseInputDto): Promise<IUsersUpdateUseCaseOutPutDto>;
}
