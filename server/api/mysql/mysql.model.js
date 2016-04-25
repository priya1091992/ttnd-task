'use strict';

var Sequelize=require('sequelize');
var sequelize=new Sequelize('ShoppingCart', 'root', 'priya',{
  define: {
    timestamps: false
  }
});

//User Model
var usernew=sequelize.define('User',{
    userId:{type:Sequelize.INTEGER, primaryKey:true},
    userName:{type:Sequelize.STRING},
    address:{type:Sequelize.STRING},
    phone:{type:Sequelize.INTEGER},
    email:{type:Sequelize.STRING},
    alternateEmail:{type:Sequelize.STRING}
  },
  {
    timestamps: false
  }
)
sequelize.sync().then(function(success) {
  console.log("Table successfully created");
}).catch(function(err){
  console.log(err);
});

//Product Model
var productnew=sequelize.define('Product',{
    productId:{type:Sequelize.INTEGER, primaryKey:true},
    description:{type:Sequelize.STRING},
    handling:{type:Sequelize.STRING}
  },
  {
    timestamps: false
  }
)
sequelize.sync().then(function(success) {
  console.log("Table successfully created");
}).catch(function(err){
  console.log(err);
});

//OrderItem Model
var ordernew=sequelize.define('OrderItem',{
    orderId:{type:Sequelize.INTEGER, primaryKey:true},
    orderDate:{type:Sequelize.DATE}
  },
  {
    timestamps: false
  }
)
usernew.hasMany(ordernew,{foreignKey: 'userId'});
sequelize.sync().then(function(success) {
  console.log("Table successfully created");
}).catch(function(err){
  console.log(err);
});

//LineItem Model
var linenew=sequelize.define('LineItem',{
    quantity:{type:Sequelize.INTEGER}
  },
  {
    timestamps: false
  }
)
ordernew.hasMany(linenew,{foreignKey: 'orderId'},{unique:'abc'});
productnew.hasMany(linenew,{foreignKey: 'productId'},{unique:'abc'});
sequelize.sync().then(function(success) {
  console.log("Table successfully created");
}).catch(function(err){
  console.log(err);
});
