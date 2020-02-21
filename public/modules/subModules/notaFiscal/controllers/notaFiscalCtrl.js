angular.module('notaFiscalCtrl', ['notaFiscalService'])
.controller('notaFiscalCtrl', ['$http',
	'$stateParams',
	'$state',
	'configURL',
	'ngNotify',
	'$scope',
	'NotaFiscal',

	function($http, $stateParams, $state, configURL, ngNotify, $scope, NotaFiscal) {

	self = this	
	self.querySearch   = querySearch
	self.selectedItemChange = selectedItemChange
	self.chosenItemToAdd;

	const { baseURL } = configURL
	const host = `${baseURL}/notaFiscal`
	self.init = function() {
		switch ("id" in $stateParams) {
			case true:
				NotaFiscal.consultarNotaFiscal()
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

	// self.consultarNotaFiscal = function() {
	// 	$http.get(`${host}/${$stateParams.id}`)
	// 	.then( ( obj ) => {
	// 		const { result } =  obj.data
	// 		self.notaFiscal = result
	// 	})
	// 	.catch((error) => {
	// 		console.log(error)
	// 	})
	// }

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

	// AUTOCOMPLETE
    function querySearch(query) {

		if (query.length > 2)	{
				return $http.get(`${baseURL}/produtofilter/${query}`).then( res => {
					return res.data.result
				})
				.catch( error  => {
					console.erros(error)
				})
			}
			return []
	  }

	  function selectedItemChange(item) {
		self.chosenItemToAdd = item
	  }
	  self.init()
}]);