/**
 * Created by priya on 20/4/16.
 */
/**
 * Created by priya on 20/4/16.
 */
angular.module('firstSecondApp')
  .factory('q3Service', function ($resource) {

    return $resource('/api/mysqls/:id/:controller', {
      id: '@_id',controller: '@controller'
    },{
      getdata:{
        method:"GET",
        isArray:"true",
        params:{}
      }


    });
  })
  .factory('q3MongoService',function($resource) {
    return $resource('/api/mongos/:id/:controller', {
      id: '@_id', controller: '@controller'
    }, {
      getresult: {
        method: "GET",
        isArray: "true",
        params: {}
      }

    })
  });

