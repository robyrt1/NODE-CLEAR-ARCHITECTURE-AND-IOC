import { lowerCase } from 'lodash';
import { program } from 'commander';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { generateFilesUseCase } from './generateFiles';

// program
//   .command('usecase <usecase>')
//   .description('[Use-case] a new use case')
//   .action(UseCase => {
//     const useCasePath = path.join(__dirname, '../../src/usecase', lowerCase(UseCase));

//     if (!existsSync(useCasePath)) {
//       mkdirSync(useCasePath);
//       generateFilesUseCase(UseCase, useCasePath);
//       return;
//     }
//     mkdirSync(useCasePath);
//     generateFilesUseCase(UseCase, useCasePath);
//     console.log(`[${UseCase}] - successfully generated`)
//     return;
//   });

// program.parse(process.argv);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
program.option('-g <dest>', '--dest must inform which module you want to generate').option('-n, --name <name>', '');

program.parse(process.argv);

const options = program.opts();
const { g, name } = options;

if (g === 'usecase') {
  const modulePath = path.join(__dirname, '../../src/usecase', name);

  if (existsSync(modulePath)) {
    console.error('[ERROR] - Module already exists');
    process.exit(1);
  }
  mkdirSync(modulePath);
  generateFilesUseCase(modulePath,name);
  console.log(`[${name}] - successfully generated`);
}

// generateFolderPattern(folderPattern, modulePath);
// const moduleCreaded = generateFilesFromDefaultFolders(folderPattern, modulePath, name);

// console.log(moduleCreaded);
