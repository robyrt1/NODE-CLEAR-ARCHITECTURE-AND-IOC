import { Container } from "inversify";
import { AUTH_IOC_IDS } from './../../../../../../@shared/constants/IOC/auth.ioc.identifiers';
import { AuthService, IAuthService } from "../../../../../../modules/auth/auth.services";

export default (container: Container): Container => {
  container.bind<IAuthService>(AUTH_IOC_IDS.SERVICE).to(AuthService);

  return container;
};


