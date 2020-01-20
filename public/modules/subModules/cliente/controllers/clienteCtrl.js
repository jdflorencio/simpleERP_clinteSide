angular.module('clienteCtrl', ['clienteService'])
.controller('clienteCtrl', ['$http', '$stateParams','$state', function($http, $stateParams, $state) {
	
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
			}
				self.cliente = {tipo: 'pf', sexo: 'masculino', enderecos: [{}], telefones: [{}]}
	}

	self.removerTelefone =  async function(index) {
		console.log(self.cliente.telefones[index].id)

		 const teste = await self.delete('telefone', self.cliente.telefones[index].id)
		
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
		.then(( result ) => {
			self.cliente = result.data
		})
		.catch((error) => {
			console.log(error)
		})
	}

	self.salvarAtualizar = () => {
		console.log('id' in $stateParams)
		switch ('id' in $stateParams) {
			case true:
				console.log('teste')

				$http.put(`${host}/`, self.cliente)
					.then((result) => {
						$state.go('editar_cliente', {id: result.data.id});

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
			result
		})
	}

	self.ufs = [
		'AC',
		'AL',
		'AP',
		'AM',
		'BA',
		'CE',
		'DF',
		'ES',
		'GO',
		'MA',
		'MT',
		'MS',
		'MG',
		'PA',
		'PB',
		'PR',
		'PE',
		'PI',
		'RJ',
		'RN',
		'RS',
		'RO',
		'RR',
		'SC',
		'SP',
		'SE',
		'TO']

	

	self.init()


cep('05010000')
.then(console.log)
	
}]);