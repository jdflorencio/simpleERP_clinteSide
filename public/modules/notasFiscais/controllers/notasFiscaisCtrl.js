angular.module('notasFiscaissCtrl', ['notasFiscaissService'])
.controller('notasFiscaissCtrl', ['$http', '$state','$filter', 'configURL', function($http, $state, $filter, configURL) {

	self = this
	const { baseURL } = configURL
	const host = `${baseURL}/notasFiscais/`

	const init = function() {
		$http.get(`${host}`)
		.then((obj) => {
			const { result } = obj.data
			self.notasFiscaiss = result
		})
	}

	self.irNotasFiscais = function(notasFiscaisId) {
		$state.go('editar_notasFiscais', {id: notasFiscaisId})
	}

	self.irTributos = function(notasFiscaisId) {
		$state.go('tributacao', {id: notasFiscaisId})
	}

	self.irGrupos = function(notasFiscaisId) {
		$state.go('grupos')
	}

	self.novoNotasFiscais = function() {
		$state.go('adicionar_notasFiscais')
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