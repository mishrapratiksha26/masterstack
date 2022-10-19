const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    customer:String,
    date:Date,
    Product:[{
        type:Schema.Types.ObjectId,
        ref:'Product'
     },
  ]
})
  

module.exports = mongoose.model('Bill',BillSchema)