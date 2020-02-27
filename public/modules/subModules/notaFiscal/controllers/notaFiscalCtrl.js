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

	self.init = function() {
		switch ("id" in $stateParams) {
			case true:
				NotaFiscal.consultarNotaFiscal()
				.then( ( obj ) => {
					const { result } = obj.data
					self.notaFiscal = result

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
		const item = {
				descricao:"NESCAFE MATINAL",
				estoque_atual:"50.0000",
				referencia:null,
				nota_itens:{}
		}

		// item.nota_itens.id = self.chosenItemToAdd.
		item.nota_itens.produtoId = self.chosenItemToAdd.id
		item.nota_itens.cfop = self.chosenItemToAdd.tributacao.cfop_dentro_estado
		item.nota_itens.cst = self.chosenItemToAdd.tributacao.cst_base_venda
		// item.nota_itens.cst = self.chosenItemToAdd.nota_itens.cst_cofins_venda
		item.nota_itens.quantidade = self.chosenItemToAdd.quantidade
		item.nota_itens.valor = self.chosenItemToAdd.vl_venda
		item.nota_itens.desconto = self.chosenItemToAdd.desconto
		item.nota_itens.acrescimo = self.chosenItemToAdd.acrescimo
		item.nota_itens.subtotal = ''
		item.nota_itens.total = ''
		item.nota_itens.aliq_icms = self.chosenItemToAdd.tributacao.aliq_icms_venda_dentro_estado // aliq_icms_venda_fora_estado
		item.nota_itens.base_icms = self.chosenItemToAdd.tributacao.cst_base_venda
		item.nota_itens.valor_icms  = ''
		item.nota_itens.aliq_subst  = ''
		item.nota_itens.base_subst = ''
		item.nota_itens.aliq_ipi = ''
		item.nota_itens.base_ipi = ''

		self.notaFiscal.itens.push(item)
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