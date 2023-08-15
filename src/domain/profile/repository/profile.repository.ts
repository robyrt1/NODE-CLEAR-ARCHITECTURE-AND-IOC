
import { IProfileEntity, ProfileEntity } from './../entity/profile.entity';
import { RepositoryInterface } from "../../@shared/repository/repository.interface";

export interface IProfileRepositoryInterface
  extends Partial<RepositoryInterface<IProfileEntity>> {}
      