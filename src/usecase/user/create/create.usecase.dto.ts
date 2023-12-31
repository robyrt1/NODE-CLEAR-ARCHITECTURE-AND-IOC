export interface ICreateUseCaseInputDto {
    nm_usuario: string;
    ds_usuario: string;
    ds_senha?: string;
}

export interface ICreateUseCaseOutputDto {
    id: string | number;
    nm_usuario: string;
    ds_usuario: string;
    ds_senha?: string;
}