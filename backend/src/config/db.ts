import mongoose from "mongoose"
import { env } from "./env"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(env.MONGODB_URI)
        console.log(`MongoDB Connected:`)
    } catch (error) {
        console.error(`Error: ${(error as Error).message}`)
        process.exit(1)
    }
}

export default connectDB