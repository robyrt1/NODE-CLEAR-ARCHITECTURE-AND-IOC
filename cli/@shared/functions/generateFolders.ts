import { mkdirSync } from 'fs';
import { forEach } from 'lodash';
import path from 'path';

const generateFolderPattern = (nameFoldsrs:string[],pathModule:string) => {
    forEach(nameFoldsrs,(name)=>{
        const modulePath = path.join(pathModule,name);
        mkdirSync(modulePath)
    })
}

export default generateFolderPattern