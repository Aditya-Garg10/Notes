const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://adityagarg646:DeepAditya@10@cluster0.e7jizuv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

async function connectToMongo() {
    await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
  }

module.exports = connectToMongo
