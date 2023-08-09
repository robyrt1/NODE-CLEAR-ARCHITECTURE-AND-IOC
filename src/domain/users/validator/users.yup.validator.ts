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
          cd_pessoa_fisica: yup.string().required("cd_pessoa_fisica is required")
        })
        .validateSync(
          {
            nm_usuario: entity.nm_usuario,
            ds_usuario: entity.ds_usuario,
            cd_pessoa_fisica: entity.cd_pessoa_fisica
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