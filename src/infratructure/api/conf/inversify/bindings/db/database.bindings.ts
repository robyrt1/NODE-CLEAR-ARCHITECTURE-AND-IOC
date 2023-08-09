import { Container } from "inversify";
import { Database } from "../../../database/database";
import { DATABASE_IOC_IDS } from "../../../../../@shared/constants/databaseI.ioc.identifiers";
import { IDatabase } from "../../../../../@shared/interfaces/database";

export default (container: Container): Container => {
  container.bind<IDatabase>(DATABASE_IOC_IDS.DATABASE).toConstantValue(Database.getInstance());
  
  return container;
};
