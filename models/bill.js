const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    customer:String,
    date:Date,
    product_name:String,
    product_code:String,
    product_price:Number,
    product_amount:Number,
    product_discount:Number,
    finalprice:Number,
    billAmount:Number

    
    
})
  

module.exports = mongoose.model('Bill',BillSchema)
