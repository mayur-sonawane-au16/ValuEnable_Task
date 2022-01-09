/*  admin   CVc1OlZelCUjPQ0B */

const express = require("express");
const app = express();
const PORT = 5000;
const InitMongo = require("./config/InitMongo");
InitMongo();
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use("/user",userRoutes);
app.use("/order",orderRoutes);

app.get("/",(req,res)=> {
    res.send("<h1>Welcome Home</h1>")
})


app.listen(PORT,() => {
    console.log("Listening on PORT : "+PORT);
});
