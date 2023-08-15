import { inject, injectable } from 'inversify';
import { PROFILE_IOC_IDS } from '../../@shared/constants/IOC/profile.ioc.identifiers';
import { IProfileCreateUseCase } from '../../../usecase/profile/create/create.usecase';
import {
  httpResponseMappingHandler,
  httpResponseMappingHandlerError,
} from '../../@shared/httpResponse/httpResponseMappingHandler';
import { HTTPCODE } from '../../@shared/constants/httpCode';

export interface IProfileServices {
    createProfile(nm_perfil: string): Promise<any>;
  }
  
@injectable()
export class ProfileServices implements IProfileServices {
  constructor(@inject(PROFILE_IOC_IDS.USECASE.CREATE) private profileCreateUseCase: IProfileCreateUseCase) {}
  async createProfile(nm_perfil: string) {
    try {
      const newProfile = await this.profileCreateUseCase.execute({ nm_perfil });
      const messageSucess = 'Sucesso ao cadastrar Perfil.';
      return httpResponseMappingHandler(true, messageSucess, newProfile, HTTPCODE.CREATED, 'sucess');
    } catch (error) {
      return httpResponseMappingHandlerError(error as Error);
    }
  }
}

