angular.module('clienteCtrl', ['clienteService'])
.controller('clienteCtrl', ['$http', '$stateParams','$state', '$window', function($http, $stateParams, $state, $window) {
	
	const host = 'http://127.0.0.1:3333/api/cliente'
	self = this

	self.tipoFormulario = {
		ativo: true
	}

	self.init = function() {
		switch ("id" in $stateParams) {
			case true:
				self.consultarCientes()

				break
			case false:
			}
				self.cliente = {tipo: 'pf', sexo: 'masculino', enderecos: [{}], telefones: [{}]}
	}

	self.removerTelefone =  async function(index) {
		console.log(self.cliente.telefones[index].id)
		
		//const teste = await self.delete('telefone', self.cliente.telefones[index].id)
		
		self.cliente.telefones.splice(index, 1);
		
    if (self.cliente.telefones.length === 0) {
			self.addTelefone();
		}
	}
	
	self.addTelefone = function() {
		self.cliente.telefones.push({})
	}

	self.removerEndereco = function(index) {
    self.cliente.enderecos.splice(index, 1);
    if (self.cliente.enderecos.length === 0) {
			self.addTelefone();
		}
	}
	
	self.addEndereco = function() {
		self.cliente.enderecos.push({})
	}

	self.salvarGeral = function() {
		console.log('aqui',self.cliente)	
	}

	self.consultarCientes = function() {
		$http.get(`${host}/${$stateParams.id}`)
		.then( ( obj ) => {
			const { result } =  obj.data
			self.cliente = result
			self.cliente.enderecos = self.cliente.enderecos.length > 0 ? self.cliente.enderecos : new Array({})
			self.cliente.telefones = self.cliente.telefones.length > 0 ? self.cliente.telefones : new Array({})
			console.log(self.cliente.telefones)
		})
		.catch((error) => {
			console.log(error)
		})
	}

	self.salvarAtualizar = () => {		
		switch ('id' in $stateParams) {
			case true:
				$http.put(`${host}/`, self.cliente)
					.then((result) => {
						$state.go('home', {id: result.data.id});
							// $window.location.reload();
							// self.init()
					}).catch( error => {
						console.log('apos salvar', error)
				})
				break
			case false:
				$http.post(`${host}`, self.cliente)
					.then((result) => {
						console.log(result)
						$state.go('editar_cliente', {id: result.data.id});
					}).catch( error => {
						console.log('apos salvar', error)
				})
		}
	}

	self.delete = (table, id_registro) => {
		console.log('aqui', `${host}/${table}/${id_registro}`)
		$http.delete(`${host}/${$stateParams.id}/${table}/${id_registro}`)
		.then( result => {
			console.log(result.data)
			if (result.data.sucesso) {}
		})
	}

	self.init()
	
}]);