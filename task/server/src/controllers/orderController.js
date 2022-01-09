const User = require("../models/user");
const Order = require("../models/order");
const OrderDetails = require("../models/orderDetails");


const createOrder = async(req,res) => {
    try {
        const {title, price, status, bookingFrom} = req.body;
        console.log(req.body) 
        
        const order = new Order({
            title,
            price,
            status,
            bookingFrom : req.user
        })
        await order.save();
        res.status(200).json({
            data : order,
            errors : [],
            message : "Order placed successfully"
        })
    } catch (error) {
        console.log(error.message);
    }
    
}


const getAllOrders = async(req,res) => {
    try {
        const allOrders = await Order.find().populate("bookingFrom","_id name email profilePic").sort("-createdAt")
        if(!allOrders.length){
            return res.status(400).json({
                data : {},
                errors : [{
                    value: "",
                    msg: "No Order yet",
                    param: "",
                    location: "body"
                }],
                message : "No Order yet"
            })
        }
        // console.log(allPosts)
        res.status(200).json({
            data : allOrders,
            errors : [],
            message : "Orders listed successfully"
        })
    } catch (error) {
        console.log(error.message);
    }
    
}


const getOrdersDetails = async(req,res) => {
    try {
        // console.log("hitting")
        // console.log(OrdersDetails)
        const OrdersDetails = await OrderDetails.find()
        // console.log(OrdersDetails+"hitting1")
        if(!OrdersDetails.length){
            return res.status(400).json({
                data : {},
                errors : [{
                    value: "",
                    msg: "No Order yet",
                    param: "",
                    location: "body"
                }],
                message : "No Order yet"
            })
        }
        // console.log(allPosts)
        // console.log(OrdersDetails+"this")
        res.status(200).json({
            
            data : OrdersDetails,
            errors : [],
            message : "Orders listed successfully"
        })
    } catch (error) {
        console.log(error.message);
    }
    
}


const getOneOrdersDetails = async(req,res) => {
    try {
        // console.log("hitting")
        // console.log(OrdersDetails)
        // console.log(req.body.serviceId.orderId)
        const OneOrdersDetail = await OrderDetails.find({_id:req.body.serviceId.orderId})
        // console.log(OrdersDetails+"hitting1")
        // console.log(OneOrdersDetail)
        if(!OneOrdersDetail.length){
            return res.status(400).json({
                data : {},
                errors : [{
                    value: "",
                    msg: "No Order yet",
                    param: "",
                    location: "body"
                }],
                message : "No Order yet"
            })
        }
        // console.log(OneOrdersDetail)
        // console.log(allPosts)
        // console.log(OrdersDetails+"this")
        res.status(200).json({
            
            data : OneOrdersDetail,
            errors : [],
            message : "Order listed successfully"
        })
    } catch (error) {
        console.log(error.message);
    }
    
}




const getMyBookings = async(req,res) => {
    try {
        const myOrders = await Order.find({bookingFrom : req.user._id}).populate("bookingFrom","_id name email profilePic")
        .sort("-createdAt")
        if(!myOrders){
            return res.status(400).json({
                data : {},
                errors : [{
                    value: "",
                    msg: "No Order yet",
                    param: "",
                    location: "body"
                }],
                message : "No Order yet"
            })
        }
        res.status(200).json({
            data : myOrders,
            errors : [],
            message : "Orders listed successfully"
        })
    } catch (error) {
        console.log(error.message);
    }
    
}






module.exports = {createOrder, getAllOrders, getMyBookings, getOrdersDetails, getOneOrdersDetails};