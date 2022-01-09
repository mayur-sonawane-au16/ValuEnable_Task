const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    profilePic:{
        type : String,
        default : "https://res.cloudinary.com/mac90/image/upload/v1629711889/no-image-baby_duligw.png"
    },
    role:{
        type : String,
        required : true
    }
    
})

module.exports = mongoose.model("User",userSchema);