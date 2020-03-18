angular.module('gruposCtrl', ['gruposService'])
.controller('gruposCtrl', ['$http', '$state','$filter', 'configURL', 'AppService', function($http, $state, $filter, configURL, AppService) {

	self = this
	const { baseURL } = configURL
	const host = `${baseURL}/grupo/`

	const init = function() {
		$http.get(`${host}`)
		.then((obj) => {
			const { dados } = obj.data
			self.grupos = dados
		})
	}

	self.novoGrupo = function(grupoId) {
		console.log('aqui', grupoId) 
		$state.go('adicionar_grupo', {id: grupoId})
	}

	self.irGrupo = function(grupoId) {
		console.log('aqui', grupoId) 
		$state.go('editar_grupo', {id: grupoId})
	}

	self.irSubgrupo = function(grupoId) {
		$state.go('subgrupos')
	}

	self.remover = function(id) {
		$http.delete(`${host}${id}`)
		.then(obj => {
			const { mensagem } = obj.data
			AppService.notificacao(obj.status, mensagem)
			init()
		})
		.catch( error => {
			AppService.notificacao(null, null)
			
		})
	}

	init()
}])