import ValidatorInterface from '../../@shared/validator/validator.interface';
import * as yup from 'yup';
import { ProfileEntity } from '../entity/profile.entity';

export class ProfileYupValidator implements ValidatorInterface<ProfileEntity> {
  validate(entity: ProfileEntity): void {
    try {
      yup
        .object()
        .shape({
          nm_perfil: yup.string().required('nm_perfil is required'),
        })
        .validateSync(
          {
            nm_perfil: entity.nm_perfil,
          },
          {
            abortEarly: false,
          },
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach(error => {
        entity.notification.addError({
          context: 'users',
          message: error,
        });
      });
    }
  }
}
