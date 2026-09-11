import { Sandbox, TimeoutError } from '@e2b/code-interpreter';
import type { langConfig } from './languages';
import type { Runresult } from "../shared/types";

export default async function e2bRunner(code: string, langConfig: langConfig): Promise<Runresult> {
    const startTime = Date.now();
    let stdout = "";
    let stderr = "";
    let exitcode: number | null = null;
    let timeout = false;

    
    const apiKey = process.env.e2b_key || process.env.E2B_API_KEY;

   // collabcode-env is a custom template that has all the required dependencies pre-installed for the supported languages.
    const sandbox = await Sandbox.create({ template: 'collabcode-env', apiKey });

    try {
        const fileName = langConfig.ext === 'java' ? 'Main.java' : `main.${langConfig.ext}`;
        const filePath = `/code/${fileName}`;

        // Ensure the target directory exists
        await sandbox.commands.run('mkdir -p /code');

        // Write the provided code directly into the sandbox filesystem
        await sandbox.files.write(filePath, code);

        const cmdString = langConfig.cmd.join(' ');

        // Execute the command in the sandbox
        const execution = await sandbox.commands.run(cmdString, {
            timeoutMs: langConfig.timeout * 1000,
        });

        stdout = execution.stdout || "";
        stderr = execution.stderr || "";
        
        exitcode = execution.exitCode !== undefined ? execution.exitCode : null;

        if (execution.error) {
            stderr += (stderr ? '\n' : '') + execution.error;
            if (exitcode === null || exitcode === 0) exitcode = 1;
        }
    } catch (err) {
        if (err instanceof TimeoutError) {
            timeout = true;
            stderr += (stderr ? '\n' : '') + "Execution timed out.";
        } else {
            stderr = err instanceof Error ? err.message : String(err);
        }
        exitcode = 1;
    } finally {
        // Always kill the sandbox to prevent resource leaks
        await sandbox.kill();
    }

    // returing in the type of Runresult interface
    return {
        stdout,
        stderr,
        exitcode,
        timeout,
        executionTimeMs: Date.now() - startTime
    };
}
