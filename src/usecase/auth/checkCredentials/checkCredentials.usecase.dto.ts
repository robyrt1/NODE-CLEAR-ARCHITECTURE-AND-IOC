export interface ICheckCredentialsUsecaseInputDto {
  user_name: string;
  password: string;
}

export interface ICheckCredentialsUsecaseOutputDto {
  user: {
    id: string | number;
    user_name: string;
    sunname: string;
  };
  token: string;
}
