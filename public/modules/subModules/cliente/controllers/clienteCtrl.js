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
				self.cliente = {tipo: 'pf', sexo: 'masculino', enderecos: [{}], telefones: [{}]}
				// self.cliente = {
    
				// 	"tipo": "pf",
				// 	"nome": "Cecília Josefa da Costa",
				// 	"sexo": "feminino",
					
				// 	"data_nascimento": "1987-08-18",
					
				// 	"nacionalidade": "BRASILEIRO",
				// 	"estado_civil": "SOLTEIRA",
				// 	"rg": "44.295.734-8",
				// 	"cpf_cnpj": "036.725.120-52",
					
				// 	"email": "cceciliajosefadacosta@panevale.com.br",
					
				// 	"telefones": [
				// 		{
						
				// 			"telefone": "(73)99115-6650",
				// 			"tipo": "Celular",
				// 		},
				// 		{
							
				// 			"telefone": "(73)3013-5050",
				// 			"tipo": "Fixo"
				// 		}
				// 	],
				// 	"enderecos": [
				// 		{
							
				// 			"endereco": "Travessa Francisco Alves",
				// 			"bairro": "Marechal Rondon",
				// 			"numero": "555",
				// 			"complemento": "perto da mercado da esquina",
				// 			"cidade": "Salvador",
				// 			"uf": "BA"
				// 		}
				// 	]
				// }
		}
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

	self.setTipoFormulario = function() {
		self.tipoFormulario.fisica = false
	}

	self.salvarGeral = function() {
		console.log('aqui',self.cliente)	
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

	self.init()
	
}]);