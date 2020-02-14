angular.module('subgruposCtrl', ['subgruposService'])
.controller('subgruposCtrl', ['$http', '$state','$filter', 'configURL', function($http, $state, $filter, configURL) {

	self = this
	const { baseURL } = configURL
	const host = `${baseURL}/subgrupo/`

	const init = function() {
		$http.get(`${host}`)
		.then((obj) => {
			const { result } = obj.data
			self.subgrupos = result
		})
	}

	self.irSubsubgrupo = function(subgrupoId) {
		console.log('aqui', subgrupoId) 
		$state.go('editar_subgrupo', {id: subgrupoId})
	}

	self.novoSubsubgrupo = function() {
		$state.go('adicionar_subgrupo')
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