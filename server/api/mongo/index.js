'use strict';

var express = require('express');
var controller = require('./mongo.controller');

var router = express.Router();

router.get('/:controller',function(req,res,next){console.log("Complete"); next();}, controller.index);
//router.get('/:id', controller.show);

module.exports = router;
