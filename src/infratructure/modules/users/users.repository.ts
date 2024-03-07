import { response } from 'inversify-express-utils';
import { get, head } from 'lodash';
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
    id,
    user_name,
    surname,
    password
    from manager.users 
where  user_name in ($1)`,
      [name],
    );

    const result = get(users, 'rows', []);
    return result[0] as IUsers;
  }

  async create({ id, user_name, sunname,password }: IUsers): Promise<void> {
    await this.database.execQuery(
      `
      insert into manager.users (user_name,surname,password)
      values($1,$2,$3)
    `,
      [user_name, sunname,password],
    );
  }

  async update(id: number, { user_name, sunname }: Partial<IUsers>): Promise<void> {
    const sql = `update manager.ger_usuario set nm_usuario = $1,ds_usuario = $2
    where nr_sequencia = $3`;
    await this.database.execQuery(sql, [user_name, sunname, id]);
  }

  async patch(id: number, { password }: Partial<IUsers>): Promise<void> {
    const sql = `update manager.ger_usuario set ds_senha = $1
    where nr_sequencia = $2`;
    await this.database.execQuery(sql, [password, id]);
  }

  getById?(id: number): Promise<IUsers> {
    throw new Error('Method not implemented.');
  }

  async getAll?(): Promise<IUsers[]> {
    const users = await this.database.execQuery(`select 
        id,
        user_name,
        surname,
        password
    from manager.users`);

    const result = get(users, 'rows', []);
    return result as IUsers[];
  }
  
  async getByProp(prop: string, value: string[] | number[]): Promise<IUsers | null> {
    const sql = `
    select 
      id,
      user_name,
      sunname,
      passaword
      from manager.users 
    where  ${prop} in ($1) `;
    const user = await this.database.execQuery(sql, value);

    const dataResponse = get(user, 'rows',[]);
    const shouldNotUser = !!head(dataResponse);

    if(!shouldNotUser) {
      return null
    }

    return {
      id: user.rows[0].id,
      user_name: user.rows[0].user_name,
      sunname: user.rows[0].sunname,
      password: user.rows[0].password,
    };
  }
}
