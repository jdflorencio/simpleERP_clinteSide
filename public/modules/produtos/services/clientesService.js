angular.module('clientesService', [])
.factory('Clientes', function($http) {
    
    var exampleFactory = {};

    exampleFactory.all = function() {
        //return $http.get(API.URL/example);
    };

    return exampleFactory;

});