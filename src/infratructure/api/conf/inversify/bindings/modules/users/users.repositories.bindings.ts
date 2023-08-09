import { Container } from "inversify";
import { IUserRepositoryInterface } from "../../../../../../../domain/users/repository/user.repository";
import { USERS_IOC_IDS } from "../../../../../../@shared/constants/IOC/users.ioc.identifiers";
import { UsersRepository } from "../../../../../../modules/users/users.repository";


export default (container: Container): Container => {
  container.bind<IUserRepositoryInterface>(USERS_IOC_IDS.REPOSITORY).to(UsersRepository);
  
  return container;
};
