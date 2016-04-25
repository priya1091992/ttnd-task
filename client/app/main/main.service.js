/**
 * Created by priya on 20/4/16.
 */
angular.module('firstSecondApp')
  .factory("migrationTask", ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    return {
      migrate: function () {
        var deferred = $q.defer();
        $http.get('/api/mysql_to_mongo/')
          .success(function (response) {
            return deferred.resolve(response);
          })
          .error(function (err) {
            return deferred.reject(err);
          });
        return deferred.promise;
      },

      noMigrate : function (obj) {
        var deferred = $q.defer();
        $http.get('/api/mongos/:')
          .success(function (response) {
            return deferred.resolve(response);
          })
          .error(function (err) {
            return deferred.reject(err);
          });
        return deferred.promise;
      }
    }
  }]);
