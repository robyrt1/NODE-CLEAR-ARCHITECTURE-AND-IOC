import { inject, injectable } from "inversify";
import { USERS_IOC_IDS } from "../../../infratructure/@shared/constants/IOC/users.ioc.identifiers";
import { IUserRepositoryInterface } from "../../../domain/users/repository/user.repository";
import { IGetAllUseCaseOutPutDto } from "./getAll.usecase.dto";

@injectable()
export class GetAllUseCase implements IGetAllUseCase {
  constructor(
    @inject(USERS_IOC_IDS.REPOSITORY)
    private usersRepository: IUserRepositoryInterface
  ) {}

  async execute(): Promise<IGetAllUseCaseOutPutDto[]> {
    const users = this.usersRepository.getAll();
    return users as unknown as IGetAllUseCaseOutPutDto[];
  }
}

export interface IGetAllUseCase {
  execute(): Promise<IGetAllUseCaseOutPutDto[]>;
}
