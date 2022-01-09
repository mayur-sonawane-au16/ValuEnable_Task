const mongoose = require("mongoose");


const OrderDetailsSchema = mongoose.Schema({
    image : {
        type: String,
        trim : true
    },
    price : {
        type : String,
        trim : true
    },
    description : {
        type : String,
        trim : true
    },
    title:{
        type: String,
        trim : true
    }
})


module.exports = mongoose.model("OrderDetail",OrderDetailsSchema);