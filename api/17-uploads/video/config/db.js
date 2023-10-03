const mongoose = require('mongoose');

const dbCon = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
  })


  module.exports = dbCon;