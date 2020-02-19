angular.module('notaFiscalCtrl', ['notaFiscalService'])
.controller('notaFiscalCtrl', ['$http',
	'$stateParams',
	'$state',
	'configURL',
	'ngNotify',
	'$scope',
	function($http, $stateParams, $state, configURL, ngNotify, $scope) {
	
	self = this	
	const { baseURL } = configURL
	const host = `${baseURL}/notaFiscal`
	self.init = function() {
		switch ("id" in $stateParams) {
			case true:
				self.consultarNotaFiscal()
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

	self.consultarNotaFiscal = function() {
		$http.get(`${host}/${$stateParams.id}`)
		.then( ( obj ) => {
			const { result } =  obj.data
			self.notaFiscal = result
			console.log(self.notaFiscal)
		})
		.catch((error) => {
			console.log(error)
		})
	}

	self.cancelar = function() {
		$state.go('notaFiscals');
	}

	self.salvarAtualizar = () => {

		let message = ':( Houve um error Inesperado '
		let type = 'error'
		switch ("id" in $stateParams && $stateParams.id != '' ) {
			case true:				
					const result  = $http.put(`${host}/`, self.notaFiscal)
					.then((result =>{						
						$state.go('notaFiscals', {id: result.data.id});
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
				$http.post(`${host}`, self.notaFiscal)
					.then((result) => {
						$state.go('notaFiscals');
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


    self.querySearch =  function(query) {
		let list = {}
		$http.get(`${baseURL}/produtofilter/${query}`)
			.then((result) => {
				list.produto = result.data.result
				console.log(list.produto)
				return [{desc : "novo"}]

			})
		
		
	  }



	
}]);