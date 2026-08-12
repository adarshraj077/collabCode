import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";


async function wrtiteCode(code:string,extension:string):Promise<string>{
    try{ 
    const folder = path.join("tmp",randomUUID(),"code");
    await fs.mkdir(folder,{recursive:true})

    const filePath= path.join(folder,`main.${extension}`)

    await fs.writeFile(filePath,code,"utf-8")
    console.log(folder)
    return folder;}
    catch(err){
       
        console.log(err)
        return "error writting to file "
    }
}

async function cleanUP(folder:string) {
    folder=path.dirname(folder)
    await fs.rm(folder,{recursive:true,force:true}).then(()=>{console.log(`removed ${folder}`)})
}



export {cleanUP,wrtiteCode}