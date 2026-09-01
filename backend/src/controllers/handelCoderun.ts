import type { Request, Response } from "express";
import runCode from "../utils/runCode";
import * as z from "zod";

const executionSchema = z.object({
    code: z.string(),
    extension: z.enum(["js", "ts", "c", "cpp", "go"]),
});


async function handelrunCode(req :Request,res: Response){

   const result= executionSchema.safeParse(req.body)
   if(!result.success){
    return res.status(400).json({ error: result.error });
   }
   const { code, extension } = result.data; 
 

    if (!code || !extension) {
        return res.status(400).json({ error: "Missing code or extension" });
    }
    try {
        const result= await runCode(code,extension)
        return res.status(200).json(result)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }

}

export default handelrunCode