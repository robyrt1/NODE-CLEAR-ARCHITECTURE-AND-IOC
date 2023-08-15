export interface IUsersPatchUseCaseInputDto {
  id: string | number;
  ds_senha: string;
  nm_usuario: string;
}
export interface IUsersPatchUseCaseOutputDto {
  id: string | number;
  ds_usuario: string;
  nm_usuario: string;
  cd_pessoa_fisica: string;
}
