const mongoose = require('mongoose');
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.connect(url).then(()=>{
    console.log("Connected MongoDb succesfully")
}).catch((err)=>{
    console.log("error occured: ",err)
})