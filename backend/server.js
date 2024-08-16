import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

//console.log(process.env.JWT_SECRET)

// API endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'))
app.use('/api/user',userRouter);
app.use('/api/cart', cartRouter);

app.get('/', (req, res)=>{res.send('server created')})

app.listen(port, ()=> {
    console.log(`Server Started on ${port}`)
})



