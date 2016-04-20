/**
 * Created by priya on 20/4/16.
 */
/**
 * Created by priya on 20/4/16.
 */
angular.module('firstSecondApp')
  .factory('q2Service', function ($resource) {

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
  .factory('q2MongoService1',function($resource) {
    return $resource('/api/mongos/:id/:controller', {
      id: '@_id', controller: '@controller'
    }, {
      getresult2: {
        method: "GET",
        isArray: "true",
        params: {}
      }

    })
  });


