
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const {jwt_secret} =require("../config/keys");


const isAuth = async(req,res,next) => {
    
    const token = req.headers.token;
    // console.log(token)
    if(!token.length){
        return res.status(400).json({
            data : {},
            errors : [{
                value:"",
                msg: "Please login first",
                param: "",
                location: "headers"
            }],
            message : "Please login first"
        })
    }
    try {
        const decoded = await jwt.verify(token,jwt_secret);
        // console.log(decoded);
        const userData = await User.findById(decoded.id);
        if(!userData){
            return res.status(400).json({
                data : {},
                errors : [],
                message : "Not a valid user!"
            })
        }
        req.body.id = userData.id;
        req.user = userData;
        // console.log(userData+"this is from isAuth");
        next()
    } catch (error) {
        console.log(error.message+"auth error")
    }
    
}

module.exports = isAuth;