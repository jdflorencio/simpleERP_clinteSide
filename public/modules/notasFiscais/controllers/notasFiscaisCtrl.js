angular.module('notasFiscaisCtrl', ['notasFiscaisService'])
.controller('notasFiscaisCtrl', function(NotasFiscais) {
	
	self = this;

	self.notasFiscaisItems = NotasFiscais.all();

});