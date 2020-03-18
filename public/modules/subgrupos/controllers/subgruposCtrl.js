
angular.module('subgruposCtrl', ['subgruposService'])
.controller('subgruposCtrl', ['$http', '$state','$filter', 'configURL', 'AppService', function($http, $state, $filter, configURL, AppService) {

	self = this
	const { baseURL } = configURL
	const host = `${baseURL}/subgrupo/`

	const init = function() {
		$http.get(`${host}`)
		.then((obj) => {
			const { dados } = obj.data
			self.subgrupos = dados
		})
	}

	self.irSubsubgrupo = function(subgrupoId) {
		$state.go('editar_subgrupo', {id: subgrupoId})
	}

	self.novoSubsubgrupo = function() {
		$state.go('adicionar_subgrupo')
	}

	self.remover = function(id) {
		$http.delete(`${host}${id}`)
		.then(obj => {
			const { mensagem } = obj.data
			AppService.notificao(obj.status, mensagem)
			init()
		})
	}

	init()
}])