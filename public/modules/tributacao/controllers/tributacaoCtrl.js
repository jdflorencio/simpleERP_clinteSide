
angular.module('tributacaoCtrl', ['tributacaoService'])
.controller('tributacaoCtrl', ['$http', '$state','$filter', 'configURL', 'AppService', function($http, $state, $filter, configURL, AppService) {

	self = this
	const { baseURL } = configURL
	const host = `${baseURL}/tributacao/`

	const init = function() {
		$http.get(`${host}`)
		.then((obj) => {
			const { dados, mensagem } = obj.data
			self.tributacaos = dados

			if (obj.status == 403) 
			{
				AppService.notificacao(obj.status, mensagem)

			}
		})
	}

	self.irTributacao = function(tributacaoId) {
		$state.go('editar_tributo', {id: tributacaoId})
	}

	self.novoTributacao = function() {
		$state.go('adicionar_tributo')
	}

	self.remover = function(id) {
		$http.delete(`${host}${id}`)
		.then(result => {
			const { mensagem } = result.data
			
			AppService.notificacao(result.status, mensagem)
			init()
		})
		.catch( error => {
			AppService.notificacao(null, null)
		})
	}

	init()
}])