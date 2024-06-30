const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://adityagarg646:aditya@cluster1.ro01vgx.mongodb.net/aditya?retryWrites=true&w=majority&appName=Cluster1"

async function connectToMongo() {
    await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
  }

module.exports = connectToMongo
