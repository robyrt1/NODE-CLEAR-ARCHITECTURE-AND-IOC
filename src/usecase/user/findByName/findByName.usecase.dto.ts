export interface IFindByNameUseCaseInputDto {
    name:string
}


export interface IFindByNameUseCaseCaseOutputDto{
    id: string | number,
    nm_usuario: string,
    ds_usuario: string,
    cd_pessoa_fisica: string,
    ds_senha: string
}