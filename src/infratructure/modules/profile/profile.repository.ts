import { inject, injectable } from 'inversify';
import { IProfileEntity } from '../../../domain/profile/entity/profile.entity';
import { IProfileRepositoryInterface } from './../../../domain/profile/repository/profile.repository';
import { DATABASE_IOC_IDS } from '../../@shared/constants/databaseI.ioc.identifiers';
import { IDatabase } from '../../@shared/interfaces/database';


@injectable()
export class ProfileRepository implements IProfileRepositoryInterface {
  constructor(@inject(DATABASE_IOC_IDS.DATABASE) private database: IDatabase) {}
  public async create({ id, nm_perfil }: IProfileEntity): Promise<void> {
    await this.database.execQuery('insert into manager.perfil_usuarios_sys (nr_sequencia, nm_perfil) values ($1,$2)', [
      id,
      nm_perfil,
    ]);
  }
}

