const mongoose = require("mongoose")

exports.connectDB = () => {
    try {
        mongoose.connect("mongodb://localhost:27017/")
        .then(()=> console.log("db connect"))
        .catch(() =>  console.log ("db failed connnection"))
    } catch (error) {
        console.error("db connnetion err:",error)
    }
}