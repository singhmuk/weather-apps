const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const ItemsRoutes = require("./routers/items.js");

app.use(express.json());
mongoose.connect(process.env.MONGO_URI)

app.use('/api/items', ItemsRoutes);
const port = process.env.PORT;

app.listen(port, ()=>console.log(`Server is running on port ${port}`))