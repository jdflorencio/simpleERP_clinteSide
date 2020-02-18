angular.module('notasFiscaisService', [])
.factory('NotasFiscais', function($http) {
    
    var notasFiscaisFactory = {};

    notasFiscaisFactory.all = function() {
        //return $http.get(API.URL/notasFiscais);
    };

    return notasFiscaisFactory;

});