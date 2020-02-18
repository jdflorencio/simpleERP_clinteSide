angular.module('notasFiscaissService', [])
.factory('notasFiscaiss', function($http) {
    
    var exampleFactory = {};

    exampleFactory.all = function() {
        //return $http.get(API.URL/example);
    };

    return exampleFactory;

});