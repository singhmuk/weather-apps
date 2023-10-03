const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Items = require('./routers/items')

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/skills');

app.use('/api/items', Items);

const port = 5000;
app.listen(port, ()=> console.log(`Server is running on port ${port}`))