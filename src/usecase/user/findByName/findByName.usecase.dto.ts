export interface IFindByNameUseCaseInputDto {
    name:string
}


export interface IFindByNameUseCaseCaseOutputDto{
    id: string | number,
    nm_usuario: string,
    ds_usuario: string,
    ds_senha: string
}