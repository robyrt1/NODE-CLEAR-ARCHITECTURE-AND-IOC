import { capitalize, startCase } from   'lodash'

export let codeByFile = [
  {
    nameFolder: 'entity',
    code: (nameModule:string):string => {
      return `
import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';

export class ${startCase(nameModule).replace(/\s/g, '')}Entity extends Entity {
    constructor() {super()}
}`;
    },
  },
  {
    nameFolder: 'factory',
    code: (nameModule:string):string => {
      return `
  import { inject, injectable } from "inversify";
  
  export class ${capitalize(nameModule)}Factory  {
      constructor() {}
  }`;
    },
  },
  {
    nameFolder: 'repository',
    code: (nameModule:string):string => {
      return `
import { ${startCase(nameModule).replace(/\s/g, '')}Entity } from './../entity/${nameModule}.entity';
import { RepositoryInterface } from "../../@shared/repository/repository.interface";

export interface I${startCase(nameModule).replace(/\s/g, '')}RepositoryInterface
  extends Partial<RepositoryInterface<${startCase(nameModule).replace(/\s/g, '')}Entity>> {}
      `;
    },
  },
  {
    nameFolder: 'validator',
    code: (nameModule:string):string => {
      return `
import ValidatorInterface from '../../@shared/validator/validator.interface';
import * as yup from 'yup';
import { ${startCase(nameModule).replace(/\s/g, '')}Entity } from '../entity/${nameModule}.entity';
    
export class ${startCase(nameModule).replace(/\s/g, '')}YupValidator implements ValidatorInterface<${startCase(nameModule).replace(/\s/g, '')}Entity> {
  validate(entity: ${startCase(nameModule).replace(/\s/g, '')}Entity): void {
    try {
      yup
        .object()
        .shape({
        })
        .validateSync(
          {
          },
          {
            abortEarly: false,
          },
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach(error => {
        entity.notification.addError({
          context: 'users',
          message: error,
        });
      });
    }
  }
}`;
    },
  },
];
