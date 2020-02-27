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
	self.chosenItemToAdd ={
		estoque_atual:0,
		quantidade: 0,
		desconto: 0,
		vl_venda: 0,
		acrescimo: 0,
		tributacao: {
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

	self.init = function() {
		switch ("id" in $stateParams) {
			case true:
				NotaFiscal.consultarNotaFiscal()
				.then( ( obj ) => {
					const { result } =  obj.data
					self.notaFiscal =  result
					self.selectedClienteChange(self.notaFiscal.cabecalho.pessoa)
				})
				break
			default:
				console.warn("Não Foi passado no parametro")
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

	self.adicionarProduto = () => {
		console.warn(self.notaFiscal.itens)
		self.notaFiscal.itens.push(self.chosenItemToAdd.itens_nota)
		console.info(self.chosenItemToAdd)
		self.chosenItemToAdd = {}
	}

	function selectedClienteChange(cliente) {
		self.chosenClienteToAdd = cliente
	}

	function selectedItemChange(item) {
		self.chosenItemToAdd = item
		self.chosenItemToAdd.quantidade = 1
		self.chosenItemToAdd.desconto = 0
		self.chosenItemToAdd.acrescimo = 0 
	}

	self.init()
}]);