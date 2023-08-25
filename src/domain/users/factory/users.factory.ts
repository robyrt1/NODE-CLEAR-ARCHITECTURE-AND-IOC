import { DATABASE_IOC_IDS } from "./../../../infratructure/@shared/constants/databaseI.ioc.identifiers";
import { inject, injectable } from "inversify";
import { IUsers, Users } from "./../entity/user.entity";
import { IDatabase } from "../../../infratructure/@shared/interfaces/database";

@injectable()
export default class UsersFactory implements IUsersFactory {
  constructor(
    @inject(DATABASE_IOC_IDS.DATABASE) private readonly database: IDatabase
  ) {}
  public async create(
    nm_usuario: string,
    ds_usuario: string,
  ): Promise<IUsers> {
    const sequence = await this.database.execQuery(`
      select nextval('manager.ger_func_usuario_seq') as id
    `);

    const user = new Users(
      sequence.rows[0].id,
      nm_usuario,
      ds_usuario,
    );

    return {
      id: user.id,
      nm_usuario: user.nm_usuario,
      ds_usuario: user.ds_usuario,
      ds_senha: user.ds_senha,
    };
  }
}

export interface IUsersFactory {
  create(
    nm_usuario: string,
    ds_usuario: string,
  ): Promise<IUsers>;
}
