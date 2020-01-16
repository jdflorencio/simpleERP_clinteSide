angular.module('clienteCtrl', ['clienteService'])
.controller('clienteCtrl', ['$http', '$stateParams',  function($http, $stateParams) {
	
	const host = 'http://127.0.0.1:3000/cliente'
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
				self.cliente = {tipo: 'pf', sexo: 'masculino'}
		}
	}

	self.removerTelefone = function(index) {
    self.telefones.splice(index, 1);
    if (self.telefones.length === 0) {
			self.addTelefone();
		}
	}
	
	self.addTelefone = function() {
		self.telefones.push({})
	}

	self.removerEndereco = function(index) {
    self.enderecos.splice(index, 1);
    if (self.enderecos.length === 0) {
			self.addTelefone();
		}
	}
	
	self.addEndereco = function() {
		self.enderecos.push({})
	}

	self.setTipoFormulario = function() {
		self.tipoFormulario.fisica = false
	}

	self.salvarGeral = function() {
		console.log('aqui',self.cliente)	
	}

	self.consultarTelefone = function() {
		switch ("id" in $stateParams) {
			case true :
				$http.get(`${host}/${$stateParams.id}/telefone`)
					.then(result => {
						self.telefones = result.data
					})
				$http.get(`${host}/${$stateParams.id}/telefonetipo`)
					.then((result) => {
						console.log(result.data)
						self.tipos = result.data.tipos
					})
				break
			case false:
				self.telefones = [{}]
			}
	}

	self.consultarEnderecos = function() {
		switch ("id" in $stateParams) {
			case true:
				$http.get(`${host}/${$stateParams.id}/endereco`)
					.then(result => {
						self.enderecos = result.data
				})
				break
			case false:
				self.enderecos = [{}]
			}
		}

	self.consultarCientes = function() {
		$http.get(`${host}/${$stateParams.id}`)
		.then(( result ) => {
			self.cliente = result.data
			if (self.cliente.tipo == 'pf') {

			}})
		.catch((error) => {
			console.log(error)
		})
	}

	self.salvarEnderecos = function() {
		if(self.enderecos.id) {
			self.atualizar('endereco', self.enderecos)
		}
	}

	self.atualizar = (tipo, valores) => {
		console.log('aquis')
		$http.put(`${host}/${$stateParams.id}/${tipo}`, valores)
			.then((result) => {
				console.log('apos atulizar', result)
			})
			.catch( error => {
				console.log('apos salvar', error)
			})
	}
	self.init()

	
}]);