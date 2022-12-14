const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name:String,
    price:Number,
    code:String,
    units:Number,
    restock_date:Date
})

module.exports = mongoose.model('Product',ProductSchema)
