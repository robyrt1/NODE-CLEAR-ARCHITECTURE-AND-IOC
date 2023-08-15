import { Container } from 'inversify';
import { PROFILE_IOC_IDS } from '../../../../../../@shared/constants/IOC/profile.ioc.identifiers';
import { IProfileFactory, ProfileFactory } from '../../../../../../../domain/profile/factory/profile.factory';

export default (container: Container): Container => {
  container.bind<IProfileFactory>(PROFILE_IOC_IDS.FACTORY).to(ProfileFactory);

  return container;
};
