import { Container } from 'inversify';
import { USERS_IOC_IDS } from '../../../../../../@shared/constants/IOC/users.ioc.identifiers';
import { UsersCreateUseCase, IUsersCreateUseCase } from '../../../../../../../usecase/user/create/create.usecase';
import { UsersGetAllUseCase, IUsersGetAllUseCase } from '../../../../../../../usecase/user/getAll/getAll.usecase';
import {
  UsersFindByNameUseCase,
  IUsersFindByNameUseCase,
} from '../../../../../../../usecase/user/findByName/findByName.usecase';
import { IUsersUpdateUseCase, UsersUpdateUseCase } from '../../../../../../../usecase/user/update/update.usecase';
import { IUsersPatchUseCase, UsersPatchUseCase } from '../../../../../../../usecase/user/patch/patch.usecase';

export default (container: Container): Container => {
  container.bind<IUsersCreateUseCase>(USERS_IOC_IDS.USECASE.CREATE).to(UsersCreateUseCase);
  container.bind<IUsersGetAllUseCase>(USERS_IOC_IDS.USECASE.GETALL).to(UsersGetAllUseCase);
  container.bind<IUsersFindByNameUseCase>(USERS_IOC_IDS.USECASE.FINDBYNAMES).to(UsersFindByNameUseCase);
  container.bind<IUsersUpdateUseCase>(USERS_IOC_IDS.USECASE.UPDATE).to(UsersUpdateUseCase);
  container.bind<IUsersPatchUseCase>(USERS_IOC_IDS.USECASE.PUTCH).to(UsersPatchUseCase);
  return container;
};
