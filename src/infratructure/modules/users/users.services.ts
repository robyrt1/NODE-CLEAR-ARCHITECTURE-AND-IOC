import { inject, injectable } from "inversify";
import { UsersRepository } from "./users.repository";
import {
  CreateUseCase,
  ICreateUseCase,
} from "../../../usecase/user/create/create.usecase";
import {
  GetAllUseCase,
  IGetAllUseCase,
} from "../../../usecase/user/getAll/getAll.usecase";
import { httpResponseMappingHandler } from "../../@shared/httpResponse/httpResponseMappingHandler";
import { HTTPCODE } from "../../@shared/constants/httpCode";
import {
  ICreateUseCaseInputDto,
  ICreateUseCaseOutputDto,
} from "../../../usecase/user/create/create.usecase.dto";
import { IHttpResponseMappingHandler } from "../../@shared/interfaces/httpResponseMappingHandlerInterface";
import { get } from "lodash";

@injectable()
export class UsersServices implements IUsersServices {
  constructor(
    @inject(CreateUseCase) private createUseCase: ICreateUseCase,
    @inject(GetAllUseCase) private getAllUseCase: IGetAllUseCase
  ) {}

  async getAll() {
    const users = await this.getAllUseCase.execute();
    return httpResponseMappingHandler(
      true,
      "Sucesso ao listar usuarios.",
      users,
      HTTPCODE.OK,
      "sucess"
    );
  }

  async create(
    param: ICreateUseCaseInputDto
  ): Promise<IHttpResponseMappingHandler<ICreateUseCaseOutputDto | []>> {
    try {
      const newUser = await this.createUseCase.execute(param);
    
      return httpResponseMappingHandler(
        true,
        "Sucesso ao salvar usuarios.",
        newUser,
        HTTPCODE.CREATED,
        "sucess"
      );
    } catch (error) {
      const messageFail = get(error, 'message', error) as any;
      const statusCode = get(
        error,
        "statusCode",
        HTTPCODE.INTERNAL_SERVER_ERROR
      );
      return httpResponseMappingHandler(
        false,
        messageFail,
        [],
        statusCode,
        "fail"
      );
    }
  }

  async findByName(name:string){
    try {
      // const user = this.
    } catch (error) {
      
    }
  }
}

export interface IUsersServices {
  getAll(): Promise<any>;
  create(
    param: ICreateUseCaseInputDto
  ): Promise<IHttpResponseMappingHandler<ICreateUseCaseOutputDto | []>>;
}
