import { Container } from "inversify";
import { USERS_IOC_IDS } from "../../../../../../@shared/constants/IOC/users.ioc.identifiers";
import { IUsersServices, UsersServices } from "../../../../../../modules/users/users.services";


export default (container: Container): Container => {
  container.bind<IUsersServices>(USERS_IOC_IDS.SERVICE).to(UsersServices);

  return container;
};
