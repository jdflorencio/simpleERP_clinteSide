angular.module('produtoCtrl', ['produtoService'])
.controller('produtoCtrl', ['$http', '$stateParams','$state', '$window', '$filter', 'configURL',function($http, $stateParams, $state, $window, $filter, configURL) {
	
	const { baseURL } = configURL
	const host = `${baseURL}/produto`
	self = this
	frontDate = function(date) {
		date = date != null ? date.split('-').reverse().join('/') : null
		return date
	}

	backDate = function(date) {
		date = date !=null ? date.split('/').reverse().join('-') : null
		return date
	}

	self.init = function() {
		switch ("id" in $stateParams) {
			case true:
				self.consultarProduto()
				break
			case false:
			}
				self.produto = {tipo: 'pf', sexo: 'masculino', enderecos: [{}], telefones: [{}]}
	}

	self.salvarGeral = function() {
		console.log('aqui',self.produto)	
	}

	self.consultarProduto = function() {
		$http.get(`${host}/${$stateParams.id}`)
		.then( ( obj ) => {
			const { result } =  obj.data
			self.produto = result.produto
			self.grupo = result.grupo
			self.subgrupo = result.subgrupo
		})
		.catch((error) => {
			console.log(error)
		})
	}

	self.cancelar = function() {
		$state.go('produtos');
	}

	self.salvarAtualizar = () => {
		switch ('id' in $stateParams) {
			case true:
				$http.put(`${host}/`, self.produto)
					.then((result) => {
						$state.go('produtos', {id: result.data.id});
							// $window.location.reload();
							// self.init()
					}).catch( error => {
						console.log('apos atualizar', error)
				})
				break
			case false:
				$http.post(`${host}`, self.produto)
					.then((result) => {
						console.log(result)
						$state.go('editar_produto', {id: result.data.id});
					}).catch( error => {
						console.log('apos gravar', error)
				})
		}
	}
	self.init()
}]);