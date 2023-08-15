import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';
import ProfileValidatorFactory from '../factory/profile.validator.factory';

export interface IProfileEntity {
  id: string | number;
  nm_perfil: string;
}
export class ProfileEntity extends Entity implements IProfileEntity {
  nm_perfil: string;
  constructor(id: number | string, nm_perfil: string) {
    super();
    this.id = id;
    this.nm_perfil = nm_perfil;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  private validate() {
    ProfileValidatorFactory.create().validate(this);
  }
}
