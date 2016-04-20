'use strict';

var express = require('express');
var controller = require('./mysql.controller');

var router = express.Router();

router.get('/:controller', controller.index);

module.exports = router;
