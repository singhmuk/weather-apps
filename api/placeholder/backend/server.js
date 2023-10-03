const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Items = require('./routers/items')
const PutItems = require('./routers/putItems')

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/skills');

app.use('/api/items', Items);
app.use('/api/updates', PutItems);

const port = 5000;
app.listen(port, ()=> console.log(`Server is running on port ${port}`))