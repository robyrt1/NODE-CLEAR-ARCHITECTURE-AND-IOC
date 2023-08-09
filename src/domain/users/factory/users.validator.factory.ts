import ValidatorInterface from "../../@shared/validator/validator.interface";
import { Users } from "../entity/user.entity";
import UsersYupValidator from "../validator/users.yup.validator";

export default class UsersValidatorFactory {
  static create(): ValidatorInterface<Users> {
    return new UsersYupValidator();
  }
}