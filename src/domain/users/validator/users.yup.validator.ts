import ValidatorInterface from "../../@shared/validator/validator.interface";
import {Users} from "../entity/user.entity";
import * as yup from "yup";

export default class UsersYupValidator
  implements ValidatorInterface<Users>
{
  validate(entity: Users): void {
    try {
      yup
        .object()
        .shape({
          nm_usuario: yup.string().required("nm_usuario is required"),
          ds_usuario: yup.string().required("ds_usuario is required"),
        })
        .validateSync(
          {
            nm_usuario: entity.nm_usuario,
            ds_usuario: entity.ds_usuario,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "users",
          message: error,
        });
      });
    }
  }
}