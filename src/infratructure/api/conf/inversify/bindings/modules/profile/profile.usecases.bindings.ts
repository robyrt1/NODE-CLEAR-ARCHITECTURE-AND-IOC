import { Container } from "inversify";
import { PROFILE_IOC_IDS } from "../../../../../../@shared/constants/IOC/profile.ioc.identifiers";
import { IProfileCreateUseCase, ProfileCreateUseCase } from "../../../../../../../usecase/profile/create/create.usecase";


export default (container: Container): Container => {
  container.bind<IProfileCreateUseCase>(PROFILE_IOC_IDS.USECASE.CREATE).to(ProfileCreateUseCase);  
  return container;
};
