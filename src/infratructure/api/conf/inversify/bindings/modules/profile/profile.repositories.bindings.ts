import { PROFILE_IOC_IDS } from '../../../../../../@shared/constants/IOC/profile.ioc.identifiers';
import { Container } from 'inversify';
import { IProfileRepositoryInterface } from '../../../../../../../domain/profile/repository/profile.repository';
import { ProfileRepository } from '../../../../../../modules/profile/profile.repository';

export default (container: Container): Container => {
  container.bind<IProfileRepositoryInterface>(PROFILE_IOC_IDS.REPOSITORY).to(ProfileRepository);

  return container;
};
