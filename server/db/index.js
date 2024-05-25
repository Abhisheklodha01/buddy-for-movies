import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

 const connectDB = async () => {
    try {
       const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected");
        console.log(`DB Host: ${connectionInstance.connection.host} `);
    } catch (error) {
        console.log("Database connection failed");
        console.log(error);
        process.exit(1)
    }
}

export default connectDB