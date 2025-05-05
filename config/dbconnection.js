const mongoose=require("mongoose");
const connectDb=async()=>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("databbase connectec",connect.connection.host,connect.connection.name)

    }
    catch(err){
        console.log(err);
        // exit the program soemthing went wrong 
        process.exit(1)
    }
}
module.exports = connectDb