angular.module('notasFiscaisCtrl', ['notasFiscaisService'])
.controller('notasFiscaisCtrl', ["NotasFiscais", "$state", function(NotasFiscais, $state) {
	
	self = this;

	NotasFiscais.getAll()

	self.remover = function(notaId) {
		NotasFiscais.deletar(notaId)
	}
	
	self.editar = function(notaId) {
		$state.go('editar_nota_fiscal', {id: notaId})
	}

}]);