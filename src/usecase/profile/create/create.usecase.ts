import { PROFILE_IOC_IDS } from '../../../infratructure/@shared/constants/IOC/profile.ioc.identifiers';
import { IProfileRepositoryInterface } from './../../../domain/profile/repository/profile.repository';
import { inject, injectable } from 'inversify';
import { IProfileCreateInputDto, IProfileCreateOutPutDto } from './create.usecase.dto';
import { IProfileFactory } from '../../../domain/profile/factory/profile.factory';

export interface IProfileCreateUseCase {
  execute(param: IProfileCreateInputDto): Promise<IProfileCreateOutPutDto>;
}


@injectable()
export class ProfileCreateUseCase implements IProfileCreateUseCase {
  constructor(
    @inject(PROFILE_IOC_IDS.REPOSITORY) private profileRepository: IProfileRepositoryInterface,
    @inject(PROFILE_IOC_IDS.FACTORY) private profileFactory: IProfileFactory,
  ) {}

  async execute({ nm_perfil }: IProfileCreateInputDto): Promise<IProfileCreateOutPutDto> {
    const profile = await this.profileFactory.create(nm_perfil);
    await this.profileRepository.create(profile);

    return {
      id: profile.id,
      nm_perfil: profile.nm_perfil,
    };
  }
}

