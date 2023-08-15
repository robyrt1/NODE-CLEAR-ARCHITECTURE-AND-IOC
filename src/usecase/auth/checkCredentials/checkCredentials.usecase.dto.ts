export interface ICheckCredentialsUsecaseInputDto {
  ds_usuario: string;
  ds_senha: string;
}

export interface ICheckCredentialsUsecaseOutputDto {
  user: {
    id: string | number;
    nm_usuario: string;
    ds_usuario: string;
    cd_pessoa_fisica: string;
  };
  token: string;
}
