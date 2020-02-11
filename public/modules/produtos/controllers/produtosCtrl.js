angular.module('produtosCtrl', ['produtosService'])
.controller('produtosCtrl', ['$http', '$state','$filter', function($http, $state, $filter) {
	
	self = this;
	const host = `http://127.0.0.1:3333/api/produto/` 

init = function() {
		$http.get(`${host}`)
		.then((obj) => {
			const { result } = obj.data
			self.produtos = result
			console.log($filter('date')(self.produtos[0].updatedAt, 'dd/MM/yyyy'))
			
		})
	}

	self.irProduto = function(produtoId) {
		$state.go('editar_produto', {id: produtoId})
	}

	self.novoProduto = function() {
		$state.go('adicionar_produto')
	}

	self.remover = function(id) {
		console.log(id)
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