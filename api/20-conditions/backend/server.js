const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const ItemRoutes = require("./routers/items.js");

app.use(express.json());
mongoose.connect(process.env.MONGO_URI);

app.use('/api/items', ItemRoutes);

const port = process.env.PORT;
app.listen(port, ()=>console.log(`Server is running on port ${port}`))
