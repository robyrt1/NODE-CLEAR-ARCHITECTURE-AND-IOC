import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import UsersValidatorFactory from "../factory/users.validator.factory";

export class Users extends Entity implements IUsers {
  nm_usuario: string;
  ds_usuario: string;
  ds_senha: string;
  cd_pessoa_fisica: string;

  constructor(
    id: string | number,
    nm_usuario: string,
    ds_usuario: string,
    cd_pessoa_fisica: string
  ) {
    super();
    this.id = id;
    this.nm_usuario = nm_usuario;
    this.ds_usuario = ds_usuario;
    this.cd_pessoa_fisica = cd_pessoa_fisica;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate() {
    UsersValidatorFactory.create().validate(this);
  }
}

export interface IUsers {
  id: string | number;
  nm_usuario: string;
  ds_usuario: string;
  cd_pessoa_fisica: string;
}
