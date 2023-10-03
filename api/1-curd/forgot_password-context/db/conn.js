const mongoose = require("mongoose");

const DB = process.env.DATABASE

mongoose.connect("mongodb://localhost:27017/forgotPassword")