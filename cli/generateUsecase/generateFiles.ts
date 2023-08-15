import { flow, forEach, lowerCase, startCase } from 'lodash';
import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';



const createFolders = (folders: string[],pathUseCase: string,name:string) => {
  forEach(folders, folder =>{
    const folderUsecase = `${pathUseCase}/${folder}` 
    mkdirSync(folderUsecase)
    dto(folder,folderUsecase,name)
    useCase(folder,folderUsecase,name)
  })
};

const dto = (nameUseCase: string, pathUseCase: string,name:string) => {
  const UseCaseDto = path.join(pathUseCase, `${lowerCase(nameUseCase)}.usecase.dto.ts`);
  const code = `
    export interface I${startCase(name).replace(/\s/g, '')}${nameUseCase}InputDto{}
    export interface I${startCase(name).replace(/\s/g, '')}${nameUseCase}OutPutDto{}
    `;
  writeFileSync(UseCaseDto, code);
};

const useCase = (nameUseCase: string, pathUseCase: string,name:string) => {
  const UseCasePath = path.join(pathUseCase, `${lowerCase(nameUseCase)}.usecase.ts`);
  const code = `
    import { inject, injectable } from "inversify";
    @injectable()
    export class ${startCase(name).replace(/\s/g, '')}${nameUseCase}UseCase {
        constructor(){}

        async execute(){}
    }
    `;
  writeFileSync(UseCasePath, code);
};

export const generateFilesUseCase = (pathUseCase: string,name:string) => {
  const folders = ['create', 'getall', 'update', 'delete'];
  createFolders(folders,pathUseCase,name)
};

