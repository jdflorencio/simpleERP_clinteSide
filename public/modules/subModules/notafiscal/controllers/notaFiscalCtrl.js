angular.module('produtoCtrl', ['produtoService'])
.controller('produtoCtrl', ['$http',
	'$stateParams',
	'$state',
	'configURL',
	'ngNotify',
	'$scope',
	function($http, $stateParams, $state, configURL, ngNotify, $scope) {
	
	self = this	
	const { baseURL } = configURL
	const host = `${baseURL}/produto`
	self.init = function() {
		switch ("id" in $stateParams) {
			case true:
				self.consultarProduto()
				break
			default:
				self.produto = {
				estoque_minimo: 0,
				estoque_maximo: 0,
				estoque_atual : 0,
				vl_custo: 0,
				vl_venda: 0
				}
			}
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

		let message = ':( Houve um error Inesperado '
		let type = 'error'
		switch ("id" in $stateParams && $stateParams.id != '' ) {
			case true:				
					const result  = $http.put(`${host}/`, self.produto)
					.then((result =>{						
						$state.go('produtos', {id: result.data.id});
						let msg = result.data.sucesso ? result.data.msg :data.error.message
						ngNotify.set(`${msg}`, {
							type:'info'
						});
					}))
					.catch ((error)=> {
						
						if (error.data.error) {
							message = `${error.data.error.message} em (${error.data.error.error[0]})`
							type = 'warn'
						}		
						ngNotify.set(`${message}`, {
							type: type,
							theme: 'pastel'
						})
					})
				break
			case false:
				$http.post(`${host}`, self.produto)
					.then((result) => {
						$state.go('produtos');
						let msg = result.data.sucesso ? result.data.msg : result.data.error.message
						ngNotify.set(`${msg}`, {type:'info',  theme: 'pastel'});
					}).catch( error => {
						ngNotify.set(`${message}`, {
							type: type,
							theme: 'pastel'
						})
				})
		}
	}
	self.init()
}]);