import { IUsers } from './../entity/user.entity';
import { RepositoryInterface } from "../../@shared/repository/repository.interface";

export interface IUserRepositoryInterface
  extends Partial<RepositoryInterface<IUsers>> {
    findByName(name:string):Promise<IUsers>
    
  }
