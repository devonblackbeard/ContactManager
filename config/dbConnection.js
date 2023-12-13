import mongoose from 'mongoose'

const connectDb = async () => {
    try {
        console.log(process.env.CONNECTION);
        const connect = await mongoose.connect(process.env.CONNECTION);
        console.log("Database connected", connect.connection.host, connect.connection.name);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}

export default connectDb;