const express = require("express");
const router = express.Router();

const { signupController, loginController } = require("../controllers/userController");
const { validateSignup, validateLogin, isValid } =require("../utils/validations");


router.post("/signup", validateSignup, isValid, signupController);

router.post("/login", validateLogin, isValid, loginController);

module.exports = router;