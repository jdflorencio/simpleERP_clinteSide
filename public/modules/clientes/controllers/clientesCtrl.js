angular.module('clientesCtrl', ['clientesService'])
.controller('clientesCtrl', ['$http', '$state', function($http, $state) {
	
	self = this;
	const host = `http://127.0.0.1:3333/api/cliente/` 

init = function() {
		$http.get(`${host}`)
		.then((obj) => {
			const { result } = obj.data
			self.clientes = result
		})
	}

	self.irCliente = function(clienteId) {
		$state.go('editar_cliente', {id: clienteId})
	}

	self.novoCliente = function() {
		$state.go('adicionar_cliente')
	}

	self.remover = function(id) {
		console.log(id)
		$http.delete(`${host}${id}`)
		.then(obj => {
			const { result } = obj.data

			switch(result.status) {
				case 200: 
					self.init()
				break
				default:
					alert('Erro Inesperado!')
					console.log('ERRO INESPERADO ===>', resul.data)
			}
		})
	}

	init()

}])