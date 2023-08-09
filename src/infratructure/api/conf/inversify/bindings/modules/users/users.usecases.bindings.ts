import { Container } from "inversify";
import { USERS_IOC_IDS } from "../../../../../../@shared/constants/IOC/users.ioc.identifiers";
import { CreateUseCase, ICreateUseCase } from "../../../../../../../usecase/user/create/create.usecase";
import { GetAllUseCase, IGetAllUseCase } from "../../../../../../../usecase/user/getAll/getAll.usecase";


export default (container: Container): Container => {
  container.bind<ICreateUseCase>(CreateUseCase).to(CreateUseCase);  
  container.bind<IGetAllUseCase>(GetAllUseCase).to(GetAllUseCase);

  return container;
};
