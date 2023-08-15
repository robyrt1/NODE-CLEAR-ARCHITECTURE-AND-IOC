import { PROFILE_IOC_IDS } from '../../../../../../@shared/constants/IOC/profile.ioc.identifiers';
import { Container } from 'inversify';
import { IProfileServices, ProfileServices } from '../../../../../../modules/profile/profile.services';

export default (container: Container): Container => {
  container.bind<IProfileServices>(PROFILE_IOC_IDS.SERVICE).to(ProfileServices);

  return container;
};
