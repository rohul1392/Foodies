const mongoose = require("mongoose");
const orderSchema= mongoose.Schema({
    customerId : {type:String , require},
    name : {type: String , require},
    email: {type: String , require},
    phone: {type: String , default: false},
    userid : {type: String , require},
    orderItems : [],
    shippingAddress : {type:Object},
    orderAmount : {type:Number , require},
    total : {type:Number , require},
    isDelivered : {type:Number , require , default: 0},
    isTakeout : {type:Number , require , default: 0},
    paymentIntentId : {type:String , require},
    payment_status : {type:String , require},
    address : {type: String },
    zipCode : {type: String },
    building : {type: String },
},{
    timestamps : true
})

module.exports = mongoose.model('orders' , orderSchema)