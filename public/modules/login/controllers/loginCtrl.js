angular.module('loginCtrl', ['loginService'])
.controller('loginCtrl', function(Login) {
	
	self = this;

	self.loginItems = Login.all();

});