angular.module('clientesCtrl', ['clientesService'])
.controller('clientesCtrl', ['$http', function($http) {
	
	self = this;


	$http.get(`http://127.0.0.1:3000/cliente/`)
	.then((result) => {
		self.clientes = result.data
	})	
}])

self.redirecionar = function() {
	console.log('cliando aqui')
}

self.irCliente = function(clienteId)
{
	console.log('cliente id', clienteId)
}

self.remover = function(clienteId)
{
	console.log('deletando', clienteId)
}