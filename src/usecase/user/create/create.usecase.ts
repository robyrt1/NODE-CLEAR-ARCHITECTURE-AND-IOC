import { inject, injectable } from "inversify";
import { USERS_IOC_IDS } from "../../../infratructure/@shared/constants/IOC/users.ioc.identifiers";
import { IUserRepositoryInterface } from "../../../domain/users/repository/user.repository";
import { ICreateUseCaseInputDto, ICreateUseCaseOutputDto } from "./create.usecase.dto";
import { IUsersFactory } from "../../../domain/users/factory/users.factory";

@injectable()
export class CreateUseCase implements ICreateUseCase {
  constructor(
    @inject(USERS_IOC_IDS.REPOSITORY)
    private usersRepository: IUserRepositoryInterface,
    @inject(USERS_IOC_IDS.FACTORY)
    private usersFactory: IUsersFactory
  ) {}

  async execute(param: ICreateUseCaseInputDto): Promise<ICreateUseCaseOutputDto> {
    const user = await this.usersFactory.create(
      param.nm_usuario,
      param.ds_usuario,
      param.cd_pessoa_fisica
    );

    await this.usersRepository.create(user);

    return {
      id: user.id,
      nm_usuario: param.nm_usuario,
      ds_usuario: param.ds_usuario,
      ds_senha: user.ds_senha,
      cd_pessoa_fisica: param.cd_pessoa_fisica,
    };
  }
}

export interface ICreateUseCase {
  execute(param: ICreateUseCaseInputDto): Promise<ICreateUseCaseOutputDto>;
}
