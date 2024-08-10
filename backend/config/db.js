
import mongoose from 'mongoose'

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://pawanb78:xR4bhpl43NrQGlbC@cluster0.qejmt.mongodb.net/food').then(()=>{
        console.log('DB connected')
    })
}