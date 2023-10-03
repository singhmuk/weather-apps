const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const ItemsRoutes = require('./routers/items.js');

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI);

app.use('/api/items', ItemsRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
