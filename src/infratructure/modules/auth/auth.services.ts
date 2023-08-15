import { inject, injectable } from 'inversify';
import { AUTH_IOC_IDS } from '../../@shared/constants/IOC/auth.ioc.identifiers';
import { ICheckCredentialsUsecase } from '../../../usecase/auth/checkCredentials/checkCredentials.usecase';
import { httpResponseMappingHandler } from '../../@shared/httpResponse/httpResponseMappingHandler';
import { HTTPCODE } from '../../@shared/constants/httpCode';
import { get } from 'lodash';
export interface IAuthService {
  checkCredentials(ds_usuario: string, ds_senha: string): Promise<any>;
}

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(AUTH_IOC_IDS.USECASE.CHECKCREDENTIALSUSECASE) private checkCredentialsUsecase: ICheckCredentialsUsecase,
  ) {}

  async checkCredentials(ds_usuario: string, ds_senha: string) {
    try {
      const result = await this.checkCredentialsUsecase.execute({ ds_usuario, ds_senha });
      return httpResponseMappingHandler(true, 'Sucesso na logar.', result, HTTPCODE.OK, 'sucess');
    } catch (error) {
      console.log(error)
      const messageFail = get(error, 'message', error) as any;
      const statusCode = get(error, 'statusCode', HTTPCODE.INTERNAL_SERVER_ERROR);
      return httpResponseMappingHandler(false, messageFail, [], statusCode, 'fail');
    }
  }
}
