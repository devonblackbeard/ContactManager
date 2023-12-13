import express from 'express'
import dotenv from 'dotenv'
import router from './routes/contactRoutes.js'
import errorHandler from './middleware/errorHandler.js'
import connectDb from './config/dbConnection.js'

dotenv.config()


connectDb();

const app = express()
app.use(express.json())

const port = process.env.PORT

app.use("/api/contacts", router)
app.use(errorHandler)

app.listen(port, () => {
    console.log("Server running");
})
