'use strict';

var _ = require('lodash');
//var Mongo = require('./mongo.model');
var userModel=require('./mongo.model').userModel;
var product=require('./mongo.model').product;
var orderItem=require('./mongo.model').orderItem;
var _=require('lodash');
var result1,result2;
var arr=[];


exports.index = function(req, res) {

  console.log(req.params);
  console.log(req.query);
  var queryString;
  var off=req.query.off;
  var li=req.query.limit;

  if(req.params.controller=='Query5Ctrl'){

    //Query:5->Get list of Products which have been ordered by User 8 and quantity 4
    orderItem.aggregate([{$unwind:"$orderDetails"},{$match:{$and:[{userId:8},{'orderDetails.quantity':4}]}}], function(err,order){
      if(err){
        console.log("Query 5 :",err);
        return handleError(res, err);
      }
      else{
        console.log("Query 5 success");
        return res.status(200).json(order);
      }
    })

  }

  else if(req.params.controller=='Query4Ctrl'){

    //Query:4->Get list of Products which have been ordered by User 8 and sort them by order date.
    orderItem.find({userId:8},{'orderDetails.productId':1,_id:0},{sort:{orderDate:1}},function(err, order){
      if(err){
        console.log("Query 4 error",err);
        return handleError(res, err);
      }
      else{
        console.log("Query 4 success");
        return res.status(200).json(order);

      }
    })


  }
  else if(req.params.controller=='Query3Ctrl'){
    //Query:3-Get List of Products which have been ordered thrice within last month.


  }

  else if(req.params.controller=='Query2Ctrl'){
//Query:2->Get List of users who have ordered product 160 with quantity 6
    orderItem.aggregate([{$unwind:"$orderDetails"},{$match:{$and:[{'orderDetails.productId':160},{'orderDetails.quantity':6}]}}], function(err,result){
      if(err){
        console.log("Query 3 error:",err);
        return handleError(res, err);
      }
      else{
        console.log("Query 3 success");
        return res.status(200).json(order);

      }
    })

  }
  else if(req.params.controller=='Query1Ctrl') {
//Query:1->Get User list followed by their order
    orderItem.find({}, {_id: 0}, {limit: 1000, sort: {UserID: 1}}, function (err, result) {
      if (err) {
        console.log("Error in query 1", err);
      }

      else {
        result1 = result;
        userModel.find({}, {_id: 0}, {limit: 1000, sort: {UserId: 1}}, function (err, result) {
          if (err) {
            console.log("Error in inner query 1:", err);
            return handleError(res, err);

          }
          else {
            result2 = result;
            result2.forEach(function (e, i) {
              var index = _.findIndex(result1, function (o) {
                return o.UserID == e.UserId
              });
              if (index >= 1) {
                var obj = {};
                obj = _.merge(e, result1[index]);
                arr.push(obj);
              }
              else {
                obj = {};
                obj = e;
                arr.push(obj);
              }
            })

            console.log("Query 1 success");
            return res.status(200).json(arr);

          }
        })
      }
    });
  }

  else{
    console.log("Wrong request");
  }


};

// Get a single mongo
exports.show = function(req, res) {
  Mongo.findById(req.params.id, function (err, mongo) {
    if(err) { return handleError(res, err); }
    if(!mongo) { return res.status(404).send('Not Found'); }
    return res.json(mongo);
  });
};

// Creates a new mongo in the DB.


function handleError(res, err) {
  return res.status(500).send(err);
}