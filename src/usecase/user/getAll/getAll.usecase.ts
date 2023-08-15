import { inject, injectable } from 'inversify';
import { USERS_IOC_IDS } from '../../../infratructure/@shared/constants/IOC/users.ioc.identifiers';
import { IUserRepositoryInterface } from '../../../domain/users/repository/user.repository';
import { IGetAllUseCaseOutPutDto } from './getAll.usecase.dto';
import { UsersMapper } from '../../../domain/users/mapper/users.mapper';

@injectable()
export class UsersGetAllUseCase implements IUsersGetAllUseCase {
  constructor(
    @inject(USERS_IOC_IDS.REPOSITORY)
    private usersRepository: IUserRepositoryInterface,
  ) {}

  async execute(): Promise<IGetAllUseCaseOutPutDto[]> {
    const users = await this.usersRepository.getAll();

    return new UsersMapper().execute(users);
  }
}

export interface IUsersGetAllUseCase {
  execute(): Promise<IGetAllUseCaseOutPutDto[]>;
}
