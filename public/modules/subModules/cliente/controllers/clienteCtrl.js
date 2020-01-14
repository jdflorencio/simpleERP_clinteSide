angular.module('clienteCtrl', ['clienteService'])
.controller('clienteCtrl', ['$http', function($http) {
	
	self = this;

	self.formulario = {
		status: true


	}

self.cliente = {
	telefones: [{}]
}

	$http.get(`http://127.0.0.1:3000/cliente/2`)
	.then(( result ) => {
		self.cliente = result.data.cliente
		
		self.endereco = result.data.endereco
		console.log(self.endereco)
	})

	self.removerTelefone = function(index) {
    self.cliente.telefones.splice(index, 1);

    if (self.cliente.telefones.length === 0) {
			self.addTelefone();
			console.log('aqui')
    }
	}
	
	self.addTelefone = function() {
		self.cliente.telefones.push({})
	}

	self.ocultarForm= function() {
		if(self.formulario.status==false) {
			self.formulario.status= true
		} else {
			self.formulario.status=false
		}
	}

	self.salvarInformacoes= function() {
		console.log()	
	}

}]);