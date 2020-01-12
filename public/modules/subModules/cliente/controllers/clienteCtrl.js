angular.module('clienteCtrl', ['clienteService'])
.controller('clienteCtrl', function(Example) {
	
	self = this;

	self.exampleItems = Example.all();

});