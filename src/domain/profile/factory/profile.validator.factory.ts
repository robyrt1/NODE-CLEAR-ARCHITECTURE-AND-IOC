import { ProfileEntity } from './../entity/profile.entity';
import ValidatorInterface from '../../@shared/validator/validator.interface';
import { ProfileYupValidator } from '../validator/profile.yup.validator';

export default class ProfileValidatorFactory {
  static create(): ValidatorInterface<ProfileEntity> {
    return new ProfileYupValidator();
  }
}
