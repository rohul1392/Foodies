const Mongoose  = require("mongoose");
require('dotenv').config()
var mongoURL = process.env.MONGO_URL;

Mongoose.connect('mongodb+srv://Saha:Apon1234566%23@cluster0.lyzsv.mongodb.net/B_Kitchen', {useUnifiedTopology : true , useNewUrlparser : true} );

var db = Mongoose.connection;

db.on('connected', ()=>{
    console.log(`Connection Successfully established`);
})

db.on('error', ()=>{
    console.log(`connection failed`);
})

module.exports = Mongoose;