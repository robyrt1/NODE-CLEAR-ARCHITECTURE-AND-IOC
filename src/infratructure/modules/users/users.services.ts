import { IUsersPatchUseCase } from './../../../usecase/user/patch/patch.usecase';
import { inject, injectable } from 'inversify';
import { IUsersCreateUseCase } from '../../../usecase/user/create/create.usecase';
import { IUsersGetAllUseCase } from '../../../usecase/user/getAll/getAll.usecase';
import {
  httpResponseMappingHandler,
  httpResponseMappingHandlerError,
} from '../../@shared/httpResponse/httpResponseMappingHandler';
import { HTTPCODE } from '../../@shared/constants/httpCode';
import { ICreateUseCaseInputDto, ICreateUseCaseOutputDto } from '../../../usecase/user/create/create.usecase.dto';
import { IHttpResponseMappingHandler } from '../../@shared/interfaces/httpResponseMappingHandlerInterface';
import { USERS_IOC_IDS } from '../../@shared/constants/IOC/users.ioc.identifiers';
import { IUsersFindByNameUseCase } from '../../../usecase/user/findByName/findByName.usecase';
import { IUsersUpdateUseCase } from '../../../usecase/user/update/update.usecase';
import { IUsersUpdateUseCaseOutPutDto } from '../../../usecase/user/update/update.usecase.dto';
import { IUsersPatchUseCaseOutputDto } from '../../../usecase/user/patch/patch.usecase.dto';

@injectable()
export class UsersServices implements IUsersServices {
  constructor(
    @inject(USERS_IOC_IDS.USECASE.CREATE) private createUseCase: IUsersCreateUseCase,
    @inject(USERS_IOC_IDS.USECASE.GETALL) private getAllUseCase: IUsersGetAllUseCase,
    @inject(USERS_IOC_IDS.USECASE.FINDBYNAMES) private findByNameUseCase: IUsersFindByNameUseCase,
    @inject(USERS_IOC_IDS.USECASE.UPDATE) private userUpdateUseCase: IUsersUpdateUseCase,
    @inject(USERS_IOC_IDS.USECASE.PUTCH) private usersPatchUseCase: IUsersPatchUseCase,
  ) {}

  async getAll() {
    try {
      const users = await this.getAllUseCase.execute();
      return httpResponseMappingHandler(true, 'Sucesso ao listar usuarios.', users, HTTPCODE.OK, 'sucess');
    } catch (error) {
      return httpResponseMappingHandlerError(error as Error);
    }
  }

  async create(param: ICreateUseCaseInputDto): Promise<IHttpResponseMappingHandler<ICreateUseCaseOutputDto | []>> {
    try {
      const newUser = await this.createUseCase.execute(param);

      return httpResponseMappingHandler(true, 'Sucesso ao salvar usuarios.', newUser, HTTPCODE.CREATED, 'sucess');
    } catch (error) {
      return httpResponseMappingHandlerError(error as Error);
    }
  }

  async findByName(name: string) {
    try {
      const user = await this.findByNameUseCase.execute({ name });

      return httpResponseMappingHandler(true, 'Sucesso ao listar usuario.', user, HTTPCODE.OK, 'sucess');
    } catch (error) {
      return httpResponseMappingHandlerError(error as Error);
    }
  }

  async update(
    id: string | number,
    ds_usuario: string,
    nm_usuario: string,
  ): Promise<IHttpResponseMappingHandler<IUsersUpdateUseCaseOutPutDto | []>> {
    try {
      const newUser = await this.userUpdateUseCase.execute({ id, ds_usuario, nm_usuario });

      return httpResponseMappingHandler(true, 'Sucesso ao atualizar usuarios.', newUser, HTTPCODE.CREATED, 'sucess');
    } catch (error) {
      return httpResponseMappingHandlerError(error as Error);
    }
  }

  async patch(
    id: string | number,
    ds_senha: string,
    nm_usuario: string,
  ): Promise<IHttpResponseMappingHandler<IUsersPatchUseCaseOutputDto | []>> {
    try {
      const newUser = await this.usersPatchUseCase.execute({ id, ds_senha, nm_usuario });

      return httpResponseMappingHandler(true, 'Sucesso ao atualizar usuarios.', newUser, HTTPCODE.CREATED, 'sucess');
    } catch (error) {
      return httpResponseMappingHandlerError(error as Error);
    }
  }
}

export interface IUsersServices {
  getAll(): Promise<any>;
  create(param: ICreateUseCaseInputDto): Promise<IHttpResponseMappingHandler<ICreateUseCaseOutputDto | []>>;
  findByName(name: string): Promise<any>;
  update(
    id: string | number,
    ds_usuario: string,
    nm_usuario: string,
  ): Promise<IHttpResponseMappingHandler<IUsersUpdateUseCaseOutPutDto | []>>;
  patch(
    id: string | number,
    ds_senha: string,
    nm_usuario: string,
  ): Promise<IHttpResponseMappingHandler<IUsersPatchUseCaseOutputDto | []>>;
}
