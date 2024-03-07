import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';
import UsersValidatorFactory from '../factory/users.validator.factory';

export class Users extends Entity implements IUsers {
  user_name: string;
  sunname: string;
  password: string;

  constructor(
    id: string | number,
    user_name: string,
    sunname: string,
    password?: string,
  ) {
    super();
    this.id = id;
    this.user_name = user_name;
    this.sunname = sunname;
    this.password = password;
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
  user_name: string;
  sunname: string;
  password: string;
}
