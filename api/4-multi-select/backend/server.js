import mongoose from "mongoose";
import express from "express";
const app = express();
import dotenv from 'dotenv';
import cors from "cors";
dotenv.config();
import ItemsRoutes from "./routers/items.js";

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)

app.use('/api/items', ItemsRoutes);
const port = process.env.PORT;

app.listen(port, ()=>console.log(`Server is running on port ${port}`))