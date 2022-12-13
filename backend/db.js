const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://Letstock:7338210933@cluster0.ew8hfub.mongodb.net/test"

const connectToMongo =()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to db");
    })
}
module.exports=connectToMongo;


