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

  if(req.params.controller=='Query5Ctrl'){

    //Query:5->Get list of Products which have been ordered by User 8 and quantity 4
    queryString='select p.ProductID, p.Description, o.OrderDate, o.UserId from Products p join LineItems l on p.ProductID=l.ProductId join OrderItems o on o.OrderId=l.OrderID and o.UserID=8 and l.Quantity=4;';
    con.query(queryString,function(err,rows){
      if(err){
        return handleError(res, err);
      }
      else{
        console.log('************Query-5***********:\n');
        console.log(rows.length);
        return res.status(200).json(rows);
      }
    });

  }

  else if(req.params.controller=='Query4Ctrl'){

    //Query:4->Get list of Products which have been ordered by User 8 and sort them by order date.
    queryString='select p.ProductID, p.Description, o.OrderDate, o.UserId from Products p join LineItems l on p.ProductID=l.ProductId join OrderItems o on o.OrderId=l.OrderID and o.UserID=8 order by o.OrderDate;';
    con.query(queryString,function(err,rows){
      if(err){
        return handleError(res, err);

      }
      else{
        console.log('************Query-4****************\n');
        console.log(rows.length);
        return res.status(200).json(rows);

      }
    });

  }
  else if(req.params.controller=='Query3Ctrl'){
    //Query:3-Get List of Products which have been ordered thrice within last month.
    queryString='select *, count(*) as c, date_sub(current_date, interval 1 month) as month from LineItems l, OrderItems o where l.OrderID=o.OrderId group by l.ProductId having c=1 and o.OrderDate>month and o.OrderDate<=current_date order by l.ProductID;';
    con.query(queryString,function(err,rows){
      if(err){
        return handleError(res, err);

      }
      else{
        console.log('****************Query-3*********************:\n');
        console.log(rows.length);}
      return res.status(200).json(rows);

    });

  }
  else if(req.params.controller=='Query2Ctrl'){
//Query:2->Get List of users who have ordered product 160 with quantity 6
    queryString='select * from Users u join OrderItems o on u.UserID=o.UserID join LineItems l on o.OrderId=l.OrderID where l.ProductID=160 and l.Quantity=6;';
    con.query(queryString,function(err,rows){
      if(err){
        return handleError(res, err);
      }
      else{
        console.log('*****************Query-2********************\n');
        console.log(rows.length);
        return res.status(200).json(rows);

      }
    });

  }
  else if(req.params.controller=='Query1Ctrl'){
//Query:1->Get User list followed by their order
      console.log(off,li)

    queryString='select * from Users u, LineItems l, OrderItems o where o.OrderId=l.OrderID and u.UserID=o.UserID order by u.UserID limit ?,?';
    var values=[off,li];
    con.query(queryString,values,function(err,rows){
      if(err){
        console.log("IN error")
        return handleError(res, err);
      }
      else{
        console.log(rows.length);
        console.log("****************Query-1**********************\n");
        return res.status(200).json(rows);
      }
    });

  }
  else{
    console.log("Wrong request");
  }
};

function handleError(res, err) {
  return res.status(500).send(err);
}
