import { inject, injectable } from 'inversify';
import { IDatabase } from '../../../infratructure/@shared/interfaces/database';
import { DATABASE_IOC_IDS } from '../../../infratructure/@shared/constants/databaseI.ioc.identifiers';
import { IProfileEntity, ProfileEntity } from '../entity/profile.entity';

@injectable()
export class ProfileFactory implements IProfileFactory {
  constructor(@inject(DATABASE_IOC_IDS.DATABASE) private readonly database: IDatabase) {}

  public async create(nm_perfil: string): Promise<IProfileEntity> {
    const sequence = await this.database.execQuery(`
          select nextval('manager.ger_perfil_usuarios_sys_seq') as id
        `);

    const profile = new ProfileEntity(sequence.rows[0].id, nm_perfil);

    return {
      id: profile.id,
      nm_perfil: profile.nm_perfil,
    };
  }
}

export interface IProfileFactory {
  create(nm_perfil: string): Promise<IProfileEntity>;
}
