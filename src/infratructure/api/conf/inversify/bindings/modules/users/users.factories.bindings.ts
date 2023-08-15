import { Container } from "inversify";
import { USERS_IOC_IDS } from "../../../../../../@shared/constants/IOC/users.ioc.identifiers";
import UsersFactory, { IUsersFactory } from "../../../../../../../domain/users/factory/users.factory";


export default (container: Container): Container => {
  container.bind<IUsersFactory>(USERS_IOC_IDS.FACTORY).to(UsersFactory);

  return container;
};
