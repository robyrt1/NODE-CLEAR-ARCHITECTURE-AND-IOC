import { CheckCredentialsUsecase, ICheckCredentialsUsecase } from '../../../../../../../usecase/auth/checkCredentials/checkCredentials.usecase';
import { JWT_IOC_IDS } from '../../../../../../@shared/constants/jwt.ioc.identifiers';
import { IJwt } from '../../../../../../@shared/interfaces/jwt';
import { JwtShared } from '../../../../../../@shared/jwt/jwt.shared';
import { AUTH_IOC_IDS } from './../../../../../../@shared/constants/IOC/auth.ioc.identifiers';
import { Container } from "inversify";


export default (container: Container): Container => {
  container.bind<ICheckCredentialsUsecase>(AUTH_IOC_IDS.USECASE.CHECKCREDENTIALSUSECASE).to(CheckCredentialsUsecase);  
  container.bind<IJwt>(JWT_IOC_IDS.JWT).to(JwtShared);
  return container;
};
