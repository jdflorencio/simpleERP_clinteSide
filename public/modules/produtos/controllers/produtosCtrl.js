angular.module('produtosCtrl', ['produtosService', 'appService'])
.controller('produtosCtrl', ['$http', '$state','$filter', 'configURL', 'AppService',

function($http, $state, $filter, configURL, AppService) {

	self = this
	const { baseURL } = configURL
	const host = `${baseURL}/produto/`

	const init = function() {
		$http.get(`${host}`)
		.then((obj) => {
			
			
			const { dados } = obj.data
			self.produtos = dados
		})
	}

	self.irProduto = function(produtoId) {
		$state.go('editar_produto', {id: produtoId})
	}

	self.irTributos = function(produtoId) {
		$state.go('tributacao', {id: produtoId})
	}

	self.irGrupos = function(produtoId) {
		$state.go('grupos')
	}

	self.novoProduto = function() {
		$state.go('adicionar_produto')
	}

	self.remover = function(id) {
		$http.delete(`${host}${id}`)
		.then(obj => {
			
			const { mensagem } = obj.data
			AppService.notificacao(obj.status, mensagem)
			init()
			})
		.catch( error => {
			AppService.notificacao(null, null)
			init()

		})
	}

	init()
}])