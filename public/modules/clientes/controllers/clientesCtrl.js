angular.module('clientesCtrl', ['clientesService'])
.controller('clientesCtrl', ['$http', '$state', function($http, $state) {
	
	self = this;
	const host = `http://127.0.0.1:3333/cliente/` 

init = function() {
		$http.get(`${host}`)
		.then((result) => {
			self.clientes = result.data
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
		.then(result => {
			switch(result.data.status) {
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