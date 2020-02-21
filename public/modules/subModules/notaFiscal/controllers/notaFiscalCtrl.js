angular.module('notaFiscalCtrl', ['notaFiscalService'])
.controller('notaFiscalCtrl', [
	'$stateParams',
	'$state',
	'NotaFiscal',
	function($stateParams, $state, NotaFiscal) {

	self = this
	self.querySearch = NotaFiscal.querySearch

	// CLIENTE	
	self.selectedClienteChange = selectedClienteChange
	self.chosenClienteToAdd

	// PRODUTO
	self.selectedItemChange = selectedItemChange
	self.chosenItemToAdd;

	self.init = function() {
		switch ("id" in $stateParams) {
			case true:
				NotaFiscal.consultarNotaFiscal()
				break
			default:
				self.notaFiscal = {
				estoque_minimo: 0,
				estoque_maximo: 0,
				estoque_atual : 0,
				vl_custo: 0,
				vl_venda: 0
				}
			}
		}

	self.salvarGeral = function() {
		console.log('aqui',self.notaFiscal)	
	}

	self.cancelar = function() {
		$state.go('notaFiscals');
	}

	self.salvarAtualizar = () => {
		switch ("id" in $stateParams && $stateParams.id != '' ) {
			case true:
				NotaFiscal.atualizar()
				break
			case false:				
				NotaFiscal.salvar()
		}
	}

	function selectedClienteChange(item) {
		self.chosenItemToAdd = item
	}

	function selectedItemChange(item) {
		self.chosenItemToAdd = item
	}
	

	  self.init()
}]);