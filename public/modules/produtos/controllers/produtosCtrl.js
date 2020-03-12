angular.module('produtosCtrl', ['produtosService', 'appService'])
.controller('produtosCtrl', ['$http', '$state','$filter', 'configURL', 'AppService',

function($http, $state, $filter, configURL, AppSevice) {

	self = this
	const { baseURL } = configURL
	const host = `${baseURL}/produto/`

	const init = function() {
		$http.get(`${host}`)
		.then((obj) => {
			
			AppSevice.notificacao(obj.status)
			const { result } = obj.data
			self.produtos = result
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
			const { result } = obj.data
			if (obj.status == 200) {				
					init()	
			}
		})
	}

	init()
}])