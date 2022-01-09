const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {jwt_secret} = require("../config/keys");


const signupController = async(req,res) => {
    const { name, email, password, profilePic, role } = req.body
    try {
        console.log(req.body)
        let user = await User.findOne({email : email});
        if(user){
            return res.status(400).json({
                data : {},
                errors : [{
                    value: req.body.email,
                    msg: "User already exist",
                    param: "email",
                    location: "body"
                }],
                message : "Unable to Signup"
            })
        }
        if(!profilePic){
            return res.status(400).json({
                data : {},
                errors : [{
                    value: req.body.email,
                    msg: "Please select a Profile pic",
                    param: "Profile Pic",
                    location: "body"
                }],
                message : "Unable to Signup"
            })
        }
        if(!role){
            return res.status(400).json({
                data : {},
                errors : [{
                    value: req.body.email,
                    msg: "Please select appropriate option",
                    param: "role",
                    location: "body"
                }],
                message : "Unable to Signup"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        user = new User({
            name,
            email,
            profilePic,
            role,
            password : hashedPassword,
        });
        await user.save();
        res.status(200).json({
            data : user,
            errors : [],
            message : "Registered Successfully!!"
        }) 
    } catch (error) {
        console.log(error.message);
    }   
}


const loginController = async(req,res) => {
    // const {email , password} = req.body;
    try {
        let user = await User.findOne({email : req.body.email});
        if(!user){
            return res.status(400).json({
                data : {},
                errors : [{
                    value: req.body.email,
                    msg: "Invalid Email Id / Password1",
                    param: "email",
                    location: "body"
                }],
                message : "Please enter valid Email / password"
            })
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return res.status(400).json({
                data : {},
                errors : [{
                    value: req.body.email,
                    msg: "Invalid Email Id / Password2",
                    param: "password",
                    location: "body"
                }],
                message : "Please enter valid Email / password"
            })
        }
        const loginToken = await jwt.sign({id : user._id},jwt_secret,{expiresIn:"1d"})
        const {_id, name, email, profilePic,role} = user;

        res.status(200).json({
            data : loginToken,
            verifiedUser : {_id,name,email,profilePic,role},
            errors : [],
            message : "Login successfull"
        })
    } catch (error) {
        console.log(error.message);
    }
    
}

module.exports = {signupController, loginController};