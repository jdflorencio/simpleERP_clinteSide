angular.module('gruposCtrl', ['gruposService'])
.controller('gruposCtrl', ['$http', '$state','$filter', 'configURL', function($http, $state, $filter, configURL) {

	self = this
	const { baseURL } = configURL
	const host = `${baseURL}/grupo/`

	const init = function() {
		$http.get(`${host}`)
		.then((obj) => {
			const { result } = obj.data
			self.grupos = result
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
			const { result } = obj.data
			if (obj.status == 200) {				
					init()	
			}
		})
	}

	init()
}])