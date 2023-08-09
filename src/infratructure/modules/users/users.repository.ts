import { get } from "lodash";
import { IUsers } from "../../../domain/users/entity/user.entity";
import { IUserRepositoryInterface } from "../../../domain/users/repository/user.repository";
import { DATABASE_IOC_IDS } from "../../@shared/constants/databaseI.ioc.identifiers";
import { IDatabase } from "../../@shared/interfaces/database";
import { inject, injectable } from "inversify";

@injectable()
export class UsersRepository implements IUserRepositoryInterface {
  constructor(
    @inject(DATABASE_IOC_IDS.DATABASE) private readonly database: IDatabase
  ) {}
  async findByName(name:string): Promise<IUsers> {
    const users = await this.database.execQuery(`select 
        nm_usuario,
        ds_usuario,
        ds_senha,
        cd_pessoa_fisica
    from manager.ger_func_usuario 
    where (nm_usuario or ds_usuario like '%$1%')`);

    const usersValidate = get(users, "rowCount", 0);
    if (usersValidate < 1) throw "Não possui usuarios.";

    const result = get(users, "rows", []);
    return result[0] as IUsers;
  }
  async create({
    id,
    nm_usuario,
    ds_usuario,
    cd_pessoa_fisica,
  }: IUsers): Promise<void> {
    const newUser = await this.database.execQuery(
      `
      insert into manager.ger_func_usuario (nr_sequencia,nm_usuario,ds_usuario,cd_pessoa_fisica)
      values($1,$2,$3,$4)
    `,
      [id,nm_usuario, ds_usuario, cd_pessoa_fisica]
    );

    const usersValidate = get(newUser, "rowCount", 0);
    if (usersValidate < 1) throw "Falha ao salvar usuário";
  }
  update?(id: number, data: IUsers): Promise<void> {
    throw new Error("Method not implemented.");
  }
  patch?(id: number, data: IUsers): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getById?(id: number): Promise<IUsers> {
    throw new Error("Method not implemented.");
  }
  async getAll?(): Promise<IUsers[]> {
    const users = await this.database.execQuery(`select 
        nm_usuario,
        ds_usuario,
        ds_senha,
        cd_pessoa_fisica
    from manager.ger_func_usuario`);

    const usersValidate = get(users, "rowCount", 0);
    if (usersValidate < 1) throw "Não possui usuarios.";

    const result = get(users, "rows", []);
    return result as IUsers[];
  }
  getOne?(filter: IUsers): Promise<IUsers> {
    throw new Error("Method not implemented.");
  }
  getMany?(filter: IUsers): Promise<IUsers[]> {
    throw new Error("Method not implemented.");
  }
  delete?(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
