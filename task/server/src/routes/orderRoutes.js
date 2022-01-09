const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");

const { createOrder, getAllOrders, getMyBookings, getOrdersDetails, getOneOrdersDetails} = require("../controllers/orderController");
const { validateOrder, isValid } =require("../utils/validations");



router.post("/createOrder", validateOrder, isValid, isAuth, createOrder);

router.get("/getAllOrders", isAuth, getAllOrders);

router.get("/getMyBookings", isAuth, getMyBookings);

router.get("/getOrdersDetails", getOrdersDetails);

router.post("/getOneOrdersDetails", isAuth, getOneOrdersDetails)





module.exports = router;