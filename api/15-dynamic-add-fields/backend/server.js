import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express();
import cors from 'cors';
dotenv.config();

import ItemRoutes from "./routers/items.js"

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI);

app.use('/api/items', ItemRoutes);

const port = process.env.PORT;
app.listen(port, ()=>console.log(`Server is running on port ${port}`))
