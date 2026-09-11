import e2bRunner from "./e2bRunner";
import { LANGUAGES } from "./languages";

const LANGUAGE_KEY_MAP: Record<string, keyof typeof LANGUAGES> = {
    javascript: "javascript",
    js: "javascript",
    typescript: "typescript",
    ts: "typescript",
    c: "c",
    cpp: "cpp",
    "c++": "cpp",
    go: "go",
    python: "python",
    py: "python",
    rust: "rust",
    rs: "rust",
    java: "java"
};

async function runCode(code:string, language:string){
    const mappedKey = LANGUAGE_KEY_MAP[language] || (language as keyof typeof LANGUAGES);
    const langConfig = LANGUAGES[mappedKey];

    if (!langConfig) {
        throw new Error(`Unsupported language: ${language}`);
    }

    // execute the code using e2b 
    const result = await e2bRunner(code, langConfig);
    
    return result;
}

export default runCode
