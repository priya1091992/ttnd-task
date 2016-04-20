/**
 * Created by priya on 20/4/16.
 */
/**
 * Created by priya on 20/4/16.
 */
angular.module('firstSecondApp')
  .factory('q4Service', function ($resource) {

    return $resource('/api/mysqls/:id/:controller', {
      id: '@_id', controller: '@controller'
    }, {
      getdata: {
        method: "GET",
        isArray: "true",
        params: {}
      }


    });
  })
      .factory('q4MongoService',function($resource){
        return $resource('/api/mongos/:id/:controller', {
          id: '@_id',controller: '@controller'
        },{
          getresult:{
            method:"GET",
            isArray:"true",
            params:{}
          }

        })
  });


