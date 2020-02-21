angular.module('exampleService', [])
.factory('Example', function($http) {
    
    var exampleFactory = {};

    exampleFactory.all = function() {
        return "aqui"
    };

    return exampleFactory;

});