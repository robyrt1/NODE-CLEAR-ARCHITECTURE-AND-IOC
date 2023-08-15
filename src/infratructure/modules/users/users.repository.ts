import { get } from 'lodash';
import { IUsers } from '../../../domain/users/entity/user.entity';
import { IUserRepositoryInterface } from '../../../domain/users/repository/user.repository';
import { DATABASE_IOC_IDS } from '../../@shared/constants/databaseI.ioc.identifiers';
import { IDatabase } from '../../@shared/interfaces/database';
import { inject, injectable } from 'inversify';

@injectable()
export class UsersRepository implements IUserRepositoryInterface {
  constructor(@inject(DATABASE_IOC_IDS.DATABASE) private readonly database: IDatabase) {}
  async findByName(name: string): Promise<IUsers> {
    const users = await this.database.execQuery(
      `select 
    nr_sequencia as id,
    nm_usuario,
    ds_usuario,
    ds_senha,
    cd_pessoa_fisica
from manager.ger_func_usuario 
where  nm_usuario in ($1)`,
      [name],
    );

    const result = get(users, 'rows', []);
    return result[0] as IUsers;
  }
  async create({ id, nm_usuario, ds_usuario, cd_pessoa_fisica }: IUsers): Promise<void> {
    const newUser = await this.database.execQuery(
      `
      insert into manager.ger_func_usuario (nr_sequencia,nm_usuario,ds_usuario,cd_pessoa_fisica)
      values($1,$2,$3,$4)
    `,
      [id, nm_usuario, ds_usuario, cd_pessoa_fisica],
    );
  }
  async update(id: number, { nm_usuario, ds_usuario }: Partial<IUsers>): Promise<void> {
    const sql = `update manager.ger_func_usuario set nm_usuario = $1,ds_usuario = $2
    where nr_sequencia = $3`;
    await this.database.execQuery(sql, [nm_usuario, ds_usuario, id]);
  }
  async patch(id: number, { ds_senha }: Partial<IUsers>): Promise<void> {
    const sql = `update manager.ger_func_usuario set ds_senha = $1
    where nr_sequencia = $2`;
    await this.database.execQuery(sql, [ds_senha, id]);
  }
  getById?(id: number): Promise<IUsers> {
    throw new Error('Method not implemented.');
  }
  async getAll?(): Promise<IUsers[]> {
    const users = await this.database.execQuery(`select 
      nr_sequencia as id,
        nm_usuario,
        ds_usuario,
        ds_senha,
        cd_pessoa_fisica
    from manager.ger_func_usuario`);

    const result = get(users, 'rows', []);
    return result as IUsers[];
  }
  async getByProp(prop: string, value: string[] | number[]): Promise<IUsers> {
    const sql = `
    select 
      nr_sequencia as id,
      nm_usuario,
      ds_usuario,
      ds_senha,
      cd_pessoa_fisica
    from manager.ger_func_usuario 
    where  ${prop} in ($1) `;
    const user = await this.database.execQuery(sql, value);

    return {
      id: user.rows[0].id,
      nm_usuario: user.rows[0].nm_usuario,
      ds_usuario: user.rows[0].ds_usuario,
      ds_senha: user.rows[0].ds_senha,
      cd_pessoa_fisica: user.rows[0].cd_pessoa_fisica,
    };
  }
}
