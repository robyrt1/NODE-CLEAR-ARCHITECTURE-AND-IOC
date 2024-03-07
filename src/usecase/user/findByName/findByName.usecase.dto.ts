export interface IFindByNameUseCaseInputDto {
    name:string
}


export interface IFindByNameUseCaseCaseOutputDto{
    id: string | number,
    user_name: string,
    sunname: string,
    password: string
}