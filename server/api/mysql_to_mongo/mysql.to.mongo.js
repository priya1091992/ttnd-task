/**
 * Created by priya on 19/4/16.
 */
exports.value=function(){
  var mysql=require('mysql');
  var async=require('async');
  var userModel=require('../mongo/mongo.model').userModel;
  var product=require('../mongo/mongo.model').product;
  var orderItem=require('../mongo/mongo.model').orderItem;
  var conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'priya',
    database:'ShoppingCart'
  });
  console.log("KKKK")
  var limit=500;
  var count=0;
  for(i=0;i<1000;i=i+limit){
    limit=500;
    parallelFunction();
    count=count+limit;
  }
  function parallelFunction(callback){
    var a;
    var userArray=[];
    var ret;
    var arr1=[];
    async.parallel([
      function(callback1){
        console.log('Task1: Executing Query');
        var queryString = "select * from Users limit ?,?";
        var values=[count,limit];
        conn.query(queryString,values, function (error, results) {
          console.log('Task1: Query Executed');
          if (error) {
            console.log('Task1: Query Failed');

          }
          else {
            console.log('Task1: Query Success');
            if (results.length) {
              ret = JSON.parse(JSON.stringify(results));

              var length = results.length;
              for (i = 0; i < length; i++) {
                var obj = {};
                a = ret[i];
                obj = {
                  'UserId': a.userId,
                  'name': a.userName,
                  'address': {'building': a.address},
                  'phone': a.phone,
                  'email': [a.email, a.alternateEmail]
                }
                userArray.push(obj);
              }
            }
            console.log("Total Users:",userArray.length)
            var user = new userModel();
            console.log(user);
            user.collection.insert(userArray, function(err,result){
              if(err){
                console.log("error",err);
                callback1(err,result);
              }
              else{
                console.log("Data inserted in user collection");}
              callback1(err,result);
            })
          };
        });

      },
      function(callback2){
        var queryString = "select * from Products limit ?,?";
        var values=[count,limit];
        userArray=[];
        conn.query(queryString,values, function (error, results) {
          if (error) {
            console.log(error);
          }
          else {
            ret = JSON.parse(JSON.stringify(results));
            var product1 = new product();
            product1.collection.insert(ret,function (err,result) {
              if (err) {
                console.log(err);
                callback2(err,result);
              }
              else {
                console.log("Data saved in Product collection");
                callback2(err,result);
              }
            });
          };
        });

      },function(callback){
        var queryString= 'select o.orderId, o.userId, o.orderDate, l.productId, count(*) as c, group_concat(p.productId) as productInfo, group_concat(quantity) as quant, group_concat(description) as des from OrderItems o join LineItems l on o.orderId=l.orderId join Products p on l.productId=p.productId group by o.orderId limit ?,?';
        var values=[count,limit];
        userArray=[];
        conn.query(queryString,values, function (error, results) {
          if (error) {
            console.log(error);
          }
          else {
            i=0;
            var resProduct;
            var resQuantity;
            var userArray=[];
            var resDescription;
            ret = JSON.parse(JSON.stringify(results));
            for(i=0;i<results.length;i++) {
              resProduct = ret[i].productInfo.split(",").map(Number);
              resQuantity = ret[i].quant.split(",").map(Number);
              resDescription=ret[i].des.split(",");
              arr1 = [];
              j = resProduct.length;
              n = resProduct.length - 1;
              var obj;
              var d=new Date(ret[i].orderDate);
              while (resProduct.length >= 1) {
                j = j - 1;
                obj1 = {
                  'productId': resProduct[j],
                  'quantity': resQuantity[j],
                  'description':resDescription[j]
                }
                arr1.unshift(obj1);
                resProduct.length--;
              }
              obj = {
                'orderId': ret[i].orderId,
                'orderDetails': arr1,
                'UserId': ret[i].userId,
                'orderDate': d
              }
              userArray.push(obj);
            }
            var order = new orderItem();
            order.collection.insert(userArray,function (err,result) {
              if (err) {
                console.log(err);
                callback(err, result);
              }
              else {
                console.log("Data saved in Order collection");
                callback(err,result);
              }
            });
          };
        })
      }
    ],function(err,result){
      if(err){
        console.log(err);
      }
      else{
        console.log("Task completed");
      }
    });
  }
}

