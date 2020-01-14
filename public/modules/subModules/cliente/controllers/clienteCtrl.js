angular.module('clienteCtrl', ['clienteService'])
.controller('clienteCtrl', ['$http', '$stateParams', function($http, $stateParams) {
	
	self = this;

	if (!$stateParams.id) {
		self.cliente = {
			telefones: [{numero: "123456"}]
		}
	}

	$http.get(`http://127.0.0.1:3000/cliente/${$stateParams.id}`)
	.then(( result ) => {
		self.cliente = result.data	
	})
	.catch((error) => {
		console.log('error')
	} )

	self.removerTelefone = function(index) {
    self.cliente.telefones.splice(index, 1);
    if (self.cliente.telefones.length === 0) {
			self.addTelefone();

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