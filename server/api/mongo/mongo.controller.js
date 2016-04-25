'use strict';

var _ = require('lodash');
var userModel=require('./mongo.model').userModel;
var product=require('./mongo.model').product;
var orderItem=require('./mongo.model').orderItem;
var _=require('lodash');
//var result1,result2;
var arr=[];
exports.index = function(req, res) {
  console.log(req.params);
  console.log(req.query);
  var queryString;
  var off=req.query.off;
  var li=req.query.limit;
  switch(req.params.controller) {
    case 'Query5Ctrl':
    {
      //Query:5->Get list of Products which have been ordered by User 8 and quantity 4
      orderItem.aggregate([{$unwind: "$orderDetails"}, {$match: {$and: [{UserId: 8}, {'orderDetails.quantity': 4}]}}], function (err, order) {
        if (err) {
          console.log("Query 5 :", err);
          return handleError(res, err);
        }
        else {
          console.log("Query 5 success");
          return res.status(200).json(order);
        }
      })
    }
      break;

    case 'Query4Ctrl':{
      //Query:4->Get list of Products which have been ordered by User 8 and sort them by order date.
      orderItem.find({UserId: 8}, {_id: 0}, {sort: {orderDate: 1}}, function (err, order) {
        if (err) {
          console.log("Query 4 error", err);
          return handleError(res, err);
        }
        else {
          console.log("Query 4 success");
          return res.status(200).json(order);
        }
      })
    }
      break;

    case 'Query3Ctrl':
    {
      //Query:3-Get List of Products which have been ordered thrice within last month.
      orderItem.aggregate([{$unwind:"$orderDetails"},{$project:{'month':{$month:'$orderDate'},'year':{$year:'$orderDate'},'orderDetails.productId':1, 'orderDate':1,'orderDetails.quantity':1,'UserId':1, 'orderId':1 ,'date':{$dayOfMonth:'$orderDate'}}},{$match: {'month':{$gte:new Date().getMonth(), $lte:new Date().getMonth()},'year':2016}}], function (err, result) {
        if (err) {
          console.log("Query 3 error:", err);
          return handleError(res, err);
        }
        else {
          console.log("Query 3 success");
          return res.status(200).json(result);
        }
      })
    }
      break;

    case 'Query2Ctrl':
    {
      var data=[];
      //Query:2->Get List of users who have ordered product 160 with quantity 6
      orderItem.aggregate([{$unwind: "$orderDetails"}, {$match: {$and: [{'orderDetails.productId': 160}, {'orderDetails.quantity': 6}]}}], function (err, result) {
        if (err) {
          console.log("Query 3 error:", err);
          return handleError(res, err);
        }
        else {
          console.log("Query 3 success");
          result.forEach(function(e,i){
            userModel.find({'UserId':result[i].UserId},{},{},function(err,r){
              if (err) {
                console.log("Error in inner query 1:", err);
                return handleError(r, err);
              }
              else{
                console.log("nnn",r)

                var obj={
                  userID:result[i].UserId,
                  name: r[i].name,
                  email:r[i].email,
                  OrderID:result[i].orderId,
                  ProductID:result[i].orderDetails,
                  address:r[i].address.building
                }
                data=[]
                data.push(obj);
                console.log(data)
                return res.status(200).json(data);
              }
            })
          });
        }
      })
    }
      break;

    case 'Query1Ctrl':
    {
      //Query:1->Get User list followed by their order
      if(req.query.user){
        orderItem.find({UserId:req.query.user}, {_id: 0}, {limit: 1000, sort: {UserId: 1}}, function (err, result) {
          if (err) {
            console.log("Error in query 1", err);
          }
          else{
            console.log(result);
            return res.status(200).json(result);
          }
        });
      }
      else{
        userModel.find({}, {_id: 0}, {limit: 1000, sort: {UserId: 1}}, function (err, result) {
          if (err) {
            console.log("Error in query 1", err);
          }
          else {
            console.log("Query 1 success");
            return res.status(200).json(result);
          }
        });
      }
    }
      break;

    default:{

      userModel.find({}, {_id: 0}, {limit: 1, sort: {UserId: 1}}, function (err, result) {
        if (err) {
          console.log("Error in query 1", err);
        }
        else {
          console.log("Query 1 success");
          return res.status(200).json(result);
        }
      });
    }
  }
};

function handleError(res, err) {
  return res.status(500).send(err);
}
