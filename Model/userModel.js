const  mongoose  = require("mongoose");

const userData=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }
})

const userModel=new mongoose.model('userData',userData)
module.exports=userModel