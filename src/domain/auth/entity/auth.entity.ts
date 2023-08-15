import Entity from "../../@shared/entity/entity.abstract";

export class AuthEntity extends Entity{
    ds_senha:string
    ds_usuario:string

    constructor(ds_usuario:string,ds_senha:string){
        super()
        this.ds_usuario = ds_usuario;
        this.ds_senha = ds_senha;
    }
}