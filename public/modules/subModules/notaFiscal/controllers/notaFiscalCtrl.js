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