const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  userId : String,
  CartItems : [
    {
      productId : String,
      title : String,
      image : String,
      price : String,
      quantity : quantity,
    } 
  ],
  addressInfo : {
    addressId : String,
    address : String,
    city : String,
    pincode : String,
    phone : String,
    notes  : String,
  },
  orderStatus : String,
  paymentMethod : String,
  paymentStatus : String,
  totalAmount : Number,
  orderData : Data,
  orderUpdateDate : Date,
  paymentId : String,
  payerId : String,
})

module.exports = mongoose.model('Order', OrderSchema)    