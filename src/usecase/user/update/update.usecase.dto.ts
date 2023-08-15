export interface IUsersUpdateUseCaseInputDto {
  id: string | number;
  ds_usuario: string;
  nm_usuario: string;
}
export interface IUsersUpdateUseCaseOutPutDto {
  id: string | number;
  ds_usuario: string;
  nm_usuario: string;
  ds_senha: string | number;
  cd_pessoa_fisica: string;
}
