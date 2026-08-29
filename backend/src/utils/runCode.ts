import path from "node:path"
import dockerRunner from "./DockerRunner";
import { LANGUAGES } from "./languages";
import { wrtiteCode, cleanUP } from "./CodeAndFile";



async function runCode(code:string, language:string){
    const langConfig = LANGUAGES[language as keyof typeof LANGUAGES];

    if (!langConfig) {
        throw new Error(`Unsupported language: ${language}`);
    }

    const folderPath = await wrtiteCode(code, langConfig.ext);
    const result = await dockerRunner(path.resolve(folderPath), langConfig);
    await cleanUP(folderPath);
    return result;
}

export default runCode
