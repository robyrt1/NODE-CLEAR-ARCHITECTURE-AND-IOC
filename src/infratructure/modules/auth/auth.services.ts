import { inject, injectable } from 'inversify';
import { AUTH_IOC_IDS } from '../../@shared/constants/IOC/auth.ioc.identifiers';
import { ICheckCredentialsUsecase } from '../../../usecase/auth/checkCredentials/checkCredentials.usecase';
import { httpResponseMappingHandler } from '../../@shared/httpResponse/httpResponseMappingHandler';
import { HTTPCODE } from '../../@shared/constants/httpCode';
import { get } from 'lodash';
export interface IAuthService {
  checkCredentials(user_name: string, passaword: string): Promise<any>;
}

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(AUTH_IOC_IDS.USECASE.CHECKCREDENTIALSUSECASE) private checkCredentialsUsecase: ICheckCredentialsUsecase,
  ) {}

  async checkCredentials(user_name: string, password: string) {
    try {
      const result = await this.checkCredentialsUsecase.execute({ user_name, password });
      return httpResponseMappingHandler(true, 'Sucesso na logar.', result, HTTPCODE.OK, 'sucess');
    } catch (error) {
      console.log("🚀 ~ AuthService ~ checkCredentials ~ error:", error)
      const messageFail = get(error, 'message', error) as any;
      const statusCode = get(error, 'statusCode', HTTPCODE.INTERNAL_SERVER_ERROR);
      return httpResponseMappingHandler(false, messageFail, [], statusCode, 'fail');
    }
  }
}
