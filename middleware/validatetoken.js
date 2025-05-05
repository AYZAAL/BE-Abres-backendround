const asyncHandler = require("express-async-handler");
const validateToken=asyncHandler(async(req,res,next)=>{

    console.log("middleware")
})
module.exports = validateToken