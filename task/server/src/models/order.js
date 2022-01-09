const mongoose = require("mongoose");


const orderSchema = mongoose.Schema({
    title : {
        type: String,
        required : true,
        trim : true
    },
    price : {
        type : String,
        trim : true
    },
    status : {
        type : String,
        default : "pending"
    },
    bookingFrom : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
},{timestamps : true})


module.exports = mongoose.model("Order",orderSchema);