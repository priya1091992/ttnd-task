/**
 * Created by priya on 20/4/16.
 */
var func=require('./mysql.to.mongo')

exports.index = function(req, res) {
  func.value();
  res.send('1');

};

