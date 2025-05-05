
const express = require("express");

const errorhandler = require("./middleware/errorhandler");

const connectDb = require("./config/dbconnection");

const dotenv=require("dotenv").config()




connectDb()
const app= express();
app.use(express.json())
const port = process.env.Port || 5000;
app.use("/api/contacts",require("./routes/contactsRoutes"))
app.use("/api/user",require("./routes/userRoutes"))
app.use(errorhandler)
app.listen(port , ()=>{console.log(`process is runing on the  port ${port}`)})