import { inject, injectable } from 'inversify';
import { USERS_IOC_IDS } from '../../../infratructure/@shared/constants/IOC/users.ioc.identifiers';
import { IUserRepositoryInterface } from '../../../domain/users/repository/user.repository';
import { defaultTo, head } from 'lodash';
import { HTTPCODE } from '../../../infratructure/@shared/constants/httpCode';
import { Users } from '../../../domain/users/entity/user.entity';
import { IUsersPatchUseCaseInputDto, IUsersPatchUseCaseOutputDto } from './patch.usecase.dto';
import { CryptographyShared } from '../../../infratructure/@shared/cryptography/cryptography.shared';

@injectable()
export class UsersPatchUseCase implements IUsersPatchUseCase {
  constructor(
    @inject(USERS_IOC_IDS.REPOSITORY)
    private usersRepository: IUserRepositoryInterface,
  ) {}

  async execute({
    id,
    ds_senha: ds_senha_request,
    nm_usuario: nm_usuario_request,
  }: IUsersPatchUseCaseInputDto): Promise<IUsersPatchUseCaseOutputDto> {
    const shouldUser = await this.usersRepository.getByProp('nr_sequencia', [id as never]);
    const shouldNotUser = !!head([shouldUser]);

    if (!shouldNotUser) throw { statusCode: HTTPCODE.BAD_REQUEST, message: 'Usuario não existe.' };

    const dsSenha = defaultTo(CryptographyShared.hash(ds_senha_request), shouldUser.ds_senha);

    const dataUpdate = new Users(id, shouldUser.nm_usuario, shouldUser.ds_usuario, dsSenha);

    await this.usersRepository.patch(Number(id), dataUpdate);

    return {
      id,
      nm_usuario: dataUpdate.nm_usuario,
      ds_usuario: dataUpdate.ds_usuario,
    };
  }
}

export interface IUsersPatchUseCase {
  execute(param: IUsersPatchUseCaseInputDto): Promise<IUsersPatchUseCaseOutputDto>;
}
