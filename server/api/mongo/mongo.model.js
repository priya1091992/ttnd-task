'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
    userId : Number,
    name:String,
    address:{
      building:String
    },
    phone:Number,
    email:[ String]}
);

var userModel = mongoose.model('User', User);

var Product=new Schema({
  productId:{type:Number},
  description:{type:String},
  handling:{type:String}
})
var product=mongoose.model('Product',Product);

var Order=new Schema({
  orderId:{type:Number},
  orderDetails:[
    {
      productId:{ type: Number},
      description:{type:String},
      quantity:{type:Number}
    }
  ],
  userId:{type:Number},
  orderDate:{type:Date}
})
var orderItem=mongoose.model('Order',Order);

module.exports={
  userModel:userModel,
  product:product,
  orderItem:orderItem
};

