import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/UserRoute'


const app = express();
const port = 3001;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/')
    .then(() => console.log("MongoDB Established"))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/users', userRouter)

app.listen(port, () => {
    console.log(`Running on port ${port}`);
    
})