'use strict';

var _ = require('lodash');
var Mysql = require('./mysql.model');
var mysql=require('mysql');

var con=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'priya',
  database:'ShoppingCart'
});
// Get list of mysqls
exports.index = function(req, res) {
  console.log(req.params);
  console.log(req.query);
  var queryString;
  var off=req.query.off;
  var li=req.query.limit;

  switch(req.params.controller){
    case 'Query5Ctrl':{
      //Query:5->Get list of Products which have been ordered by User 8 and quantity 4
      queryString='select p.ProductID, p.Description, o.OrderDate, o.UserId, l.quantity from Products p join LineItems l on p.ProductID=l.ProductId join OrderItems o on o.OrderId=l.OrderID and o.UserID=8 and l.Quantity=4;';
      con.query(queryString,function(err,rows){
        if(err){
          return handleError(res, err);
        }
        else{
          console.log('************Query-5***********:\n');
          return res.status(200).json(rows);
        }
      });
    }
      break;
    case 'Query4Ctrl':{
      //Query:4->Get list of Products which have been ordered by User 8 and sort them by order date.
      queryString='select p.ProductID, p.Description, o.OrderDate, o.UserId from Products p join LineItems l on p.ProductID=l.ProductId join OrderItems o on o.OrderId=l.OrderID and o.UserID=8 order by o.OrderDate;';
      con.query(queryString,function(err,rows){
        if(err){
          return handleError(res, err);
        }
        else{
          console.log('************Query-4****************\n');
          return res.status(200).json(rows);
        }
      });
    }
      break;

    case 'Query3Ctrl':{
      //Query:3-Get List of Products which have been ordered thrice within last month.
      queryString='select * from OrderItems as OI join LineItems as LI on OI.orderId=LI.orderId where OI.orderDate>="2016-03-01 18:15:08" and OI.orderDate<="2016-03-30 18:15:08";';
      con.query(queryString,function(err,rows){
        if(err){
          return handleError(res, err);

        }
        else{
          console.log('****************Query-3*********************:\n');
        }
        return res.status(200).json(rows);

      });
    }
      break;

    case 'Query2Ctrl':{
      //Query:2->Get List of users who have ordered product 160 with quantity 6
      queryString='select * from Users u join OrderItems o on u.UserID=o.UserID join LineItems l on o.OrderId=l.OrderID where l.ProductID=160 and l.Quantity=6;';
      con.query(queryString,function(err,rows){
        if(err){
          return handleError(res, err);
        }
        else{
          console.log('*****************Query-2********************\n');
          return res.status(200).json(rows);

        }
      });
    }
      break;
    case 'Query1Ctrl':{
      //    Query:1->Get User list followed by their order
      queryString='select u.userId,u.userName, u.address, group_concat(o.orderDate) as date, group_concat(o.orderId) as orderID, group_concat(l.productId) as productID, group_concat(l.quantity) as Quantity, count(*) as sum from Users u left join OrderItems o on u.UserID=o.UserID left join LineItems l on o.OrderId=l.OrderID group by u.UserId order by u.UserID';
      var values=[off,li];
      con.query(queryString,function(err,rows){
        if(err){
          return handleError(res, err);
        }
        else{
          console.log("****************Query-1**********************\n");
          return res.status(200).json(rows);
        }
      });
    }
      break;
    default: {
      console.log("wrong choice")

    };
  }
};

function handleError(res, err) {
  return res.status(500).send(err);
}
