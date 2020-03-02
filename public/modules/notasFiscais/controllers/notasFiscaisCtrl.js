angular.module('notasFiscaisCtrl', ['notasFiscaisService'])
.controller('notasFiscaisCtrl', ["NotasFiscais", "$state", "$mdBottomSheet", function(NotasFiscais, $state, $mdBottomSheet) {
	
	self = this;

	NotasFiscais.getAll()

	self.remover = function(notaId) {
		NotasFiscais.deletar(notaId)
	}
	
	self.editar = function(notaId) {
		$state.go('editar_nota_fiscal', {id: notaId})
	}

	self.pagina = function(pag) {
		NotasFiscais.getAll(pag)

	}

}]);