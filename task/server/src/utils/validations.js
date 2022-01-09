const { check, validationResult } = require("express-validator");


const validateSignup = [
    check("name").not().isEmpty().withMessage("Name field cannot be blank"),
    check("email").not().isEmpty().withMessage("Email field cannot be blank").isEmail().withMessage("Please enter valid email id"),
    check("password").not().isEmpty().withMessage("Password field cannot be blank"),
    check("role").not().isEmpty().withMessage("Please select your option")
    // check("profilePic").not().isEmpty().withMessage("Please select profile Pic")
]

const validateLogin = [
    check("email").not().isEmpty().withMessage("Email field cannot be blank").isEmail().withMessage("Please enter valid email id"),
    check("password").not().isEmpty().withMessage("Password field cannot be blank")
]

const validateOrder = [
    check("title").not().isEmpty().withMessage("Title field cannot be blank"),
    check("price").not().isEmpty().withMessage("price field cannot be blank"),
    // check("image").not().isEmpty().withMessage("Please select an image to upload")
]


const isValid = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            data : {},
            errors : errors.array()
        })
    }
    next();
}

module.exports = {validateLogin, validateSignup , validateOrder, isValid};