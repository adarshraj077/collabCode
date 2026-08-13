import path from "node:path"
import dockerRunner from "./DockerRunner";
import { LANGUAGES } from "./languages";
import { wrtiteCode, cleanUP } from "./CodeAndFile";



async function runCode(code:string,extension:string){
    
    const folderPath= await wrtiteCode(code,extension)
    const langConfig=Object.values(LANGUAGES).find(lang=>lang.ext===extension)
    if (!langConfig) {
    throw new Error(`Unsupported extension: ${extension}`);
}
    const result= await dockerRunner(path.resolve(folderPath),langConfig)
    await cleanUP(folderPath)
    return result

}

export default runCode
