import { program } from 'commander';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { folderPattern } from '../@shared/constants/folderPattern';
import generateFolderPattern from '../@shared/functions/generateFolders';
import generateFilesFromDefaultFolders from '../@shared/functions/generateFilesFromDefaultFolders';
import { startCase, upperCase } from 'lodash';

const modules = {
  domain: 'domain',
  infra: 'infra',
};

program.option('-g <dest>', '--dest must inform which module you want to generate').option('-n, --name <name>', '');

program.parse(process.argv);

const options = program.opts();
const { g, name } = options;

if (g === modules.domain) {
  const modulePath = path.join(__dirname, '../../src/domain', name);

  if (existsSync(modulePath)) {
    console.error('[ERROR] - Module already exists');
    process.exit(1);
  }
  mkdirSync(modulePath);

  generateFolderPattern(folderPattern, modulePath);
  const moduleCreaded = generateFilesFromDefaultFolders(folderPattern, modulePath, name);

  console.log(`[${upperCase(name)}] - successfully generated`);
  console.log(moduleCreaded);
}

