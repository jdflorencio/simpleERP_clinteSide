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

	self.irGrupo = function(grupoId) {
		console.log('aqui', grupoId) 
		$state.go('editar_grupo', {id: grupoId})
	}

	self.novoGrupo = function() {
		$state.go('adicionar_grupo')
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