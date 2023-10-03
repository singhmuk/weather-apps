const express = require('express');
require('dotenv').config();
const app = express();
const dbCon = require('./config/db');
const ItemRoutes = require("./routes/items");
const UsersRoutes = require("./routes/users");
const AuthRoutes = require("./routes/auth");

app.use(express.json());
dbCon;

app.use('/items', ItemRoutes);
app.use('/users', UsersRoutes);
app.use('/auth', AuthRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
