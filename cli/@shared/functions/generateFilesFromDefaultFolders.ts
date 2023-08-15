import { writeFileSync } from 'fs';
import { forEach } from 'lodash';
import path from 'path';
import { codeByFile } from '../constants/codeFile';
interface ICodeString {
  code: (nameModule: string) => string;
  nameFolder: string;
}

const generateFilesFromDefaultFolders = (nameFoldsrs: string[], pathModule: string, nameModule: string) => {
  const pathCreaded: string[] = [];
  forEach(nameFoldsrs, name => {
    const modulePath = path.join(pathModule, name);
    const moduleFile = path.join(modulePath, `${nameModule}.${name === 'validator' ? 'yup.validator' : name}.ts`);
    codeByFile.map(code => {
      if (code.nameFolder === name) {
        pathCreaded.push(moduleFile);
        writeFileSync(moduleFile, code.code(nameModule));
      }
      return null;
    }) as unknown as ICodeString;
  });

  return pathCreaded;
};

export default generateFilesFromDefaultFolders;
