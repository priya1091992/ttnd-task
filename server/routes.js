/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
 // app.use('/api/mysql/users', require('./api/user'));
  app.use('/api/mongos', require('./api/mongo'));
  app.use('/api/mysqls', require('./api/mysql'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/mysql_to_mongo', require('./api/mysql_to_mongo'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
