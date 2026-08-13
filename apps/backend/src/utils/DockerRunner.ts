import { spawn } from 'child_process';
import type { langConfig } from './languages';
import type {Runresult} from "@collabcode/shared";


export default function dockerRunner(tmpDir:string,langConfig:langConfig):Promise<Runresult>{

    return new Promise((resolve, reject) => {

    let stdout=""
    let stderr=""
   var exitcode:number|null
    let timeout=false;
    let executionTimeMs=Date.now()
    try{ 
    const process=spawn('docker',[
        'run','--rm',
        '--network=none',
        '--memory', langConfig.memory,
        '--cpus=1',
        '-v', `${tmpDir}:/code`,
        `${langConfig.image}`,
        ...langConfig.cmd
    ])

    process.stdout.on('data', (data) => {
     console.log(`stdout: ${data}`);
     stdout+=data.toString()
      });

    process.stderr.on('data',(data) => {
      stderr+=data.toString()
    })
    
    const timer = setTimeout(() => {
   timeout = true;
    process.kill("SIGKILL");
   }, langConfig.timeout * 1000);


    process.on('close', (code) => {
    clearTimeout(timer);
     console.log(`exited with code ${code}`);

     exitcode=code
     resolve({
                stdout,
                stderr,
                exitcode,
                timeout,
                executionTimeMs:Date.now()-executionTimeMs
            });
    });

}catch(err){
        reject(err);
       
    }})
    
}
