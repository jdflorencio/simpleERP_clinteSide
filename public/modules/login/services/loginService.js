angular.module('loginService', [])
.factory('Login', function($http) {
    
    var loginFactory = {};

    loginFactory.all = function() {
        return "aqui"
    };

    return loginFactory;

});