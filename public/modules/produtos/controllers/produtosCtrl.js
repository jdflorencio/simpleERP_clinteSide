angular.module('produtosCtrl', ['produtosService'])
.controller('produtosCtrl', ['$http', '$state','$filter', 'configURL', function($http, $state, $filter, configURL) {

	self = this
	const { baseURL } = configURL
	const host = `${baseURL}/produto/`

	const init = function() {
		$http.get(`${host}`)
		.then((obj) => {
			const { result } = obj.data
			self.produtos = result
			console.log(self.produtos)
			console.log($filter('date')(self.produtos[0].updatedAt, 'dd/MM/yyyy'))			
		})
	}

	self.irProduto = function(produtoId) {
		console.log('aqui', produtoId) 
		$state.go('editar_produto', {id: produtoId})
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