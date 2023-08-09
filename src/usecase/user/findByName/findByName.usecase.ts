import { inject, injectable } from "inversify";
import { USERS_IOC_IDS } from "../../../infratructure/@shared/constants/IOC/users.ioc.identifiers";
import { IUserRepositoryInterface } from "../../../domain/users/repository/user.repository";

@injectable()
export class FindByNameUseCase {
    constructor(@inject(USERS_IOC_IDS.REPOSITORY) private usersRepository:IUserRepositoryInterface){}

    async execute(){
        const users = this.usersRepository.findByName()
    }
}