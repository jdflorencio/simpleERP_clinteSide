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
					self.chosenItemToAdd = {					
						aliq_icms_venda_dentro_estado: 0.0,
						aliq_icms_venda_fora_estado: 0.0,
						aliq_icms_reducao_venda: 0.0,
						cst_base_venda: 0.0,
						cst_pis_venda: 0.0,
						aliq_pis_venda: 0.0,
						cst_cofins_venda: 0.0,
						aliq_cofins_venda: 0.0,
						aliq_icms_compra_dentro_estado: 0.0,
						aliq_icms_compra_fora_estado: 0.0,
						aliq_icms_reducao_compra: 0.0,
						cst_base_compra: 0.0,
						cst_pis_compra: 0.0,
						aliq_pis_compra: 0.0,
						cst_cofins_compra: 0.0,
						aliq_cofins_compra: 0.0,
						mva: 0.0
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

	function selectedClienteChange(cliente) {
		self.chosenClienteToAdd = cliente
	}

	function selectedItemChange(item) {
		self.chosenItemToAdd = item
	}
	

	  self.init()
}]);