const mongoose = require("mongoose")
const statusSchema = new mongoose.Schema({
    pid : {
        type : Number , 
        require : true 
    }, 
    ptitle : {
        type : String ,
        require : true 
    },
    price : {
        type : Number , 
        require : true 
    },
    orderId : {
        type : String , 
        require : true 
    },
    paymentId : {
        type : String , 
        require : true ,
        default : "N/A"
    },
    status : {
        type : String ,
        default : "Failed" 
    }
})

const status = mongoose.model('status' , statusSchema) ; 
module.exports = status ; 

