var express = require('express');
var controller = require('./mysql.to.mongo.controller');

var router = express.Router();
router.get('/', controller.index);

//var func=require('./mysql.to.mongo')
//func.value();
module.exports = router;
