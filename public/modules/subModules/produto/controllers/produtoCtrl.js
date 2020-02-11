angular.module('produtoCtrl', ['produtoService'])
.controller('produtoCtrl', ['$http', '$stateParams','$state', '$window', '$filter', function($http, $stateParams, $state, $window, $filter) {
	
	const host = 'http://127.0.0.1:3333/api/produto'
	self = this

	self.tipoFormulario = {
		ativo: true
	}
	
	frontDate = function(date) {
		
		date = date != null ? date.split('-').reverse().join('/') : null
		return date		

	}

	backDate = function(date) {
		date = date !=null ? date.split('/').reverse().join('-') : null
		return date
	}

	self.init = function() {
		switch ("id" in $stateParams) {
			case true:
				self.consultarCientes()

				break
			case false:
			}
				self.produto = {tipo: 'pf', sexo: 'masculino', enderecos: [{}], telefones: [{}]}
	}

	self.removerTelefone =  async function(index) {
		console.log(self.produto.telefones[index].id)
		
		self.produto.telefones.splice(index, 1);
		
    if (self.produto.telefones.length === 0) {
			self.addTelefone();
		}
	}
	
	self.addTelefone = function() {
		self.produto.telefones.push({})
	}

	self.removerEndereco = function(index) {
    self.produto.enderecos.splice(index, 1);
    if (self.produto.enderecos.length === 0) {
			self.addEndereco();
		}
	}
	
	self.addEndereco = function() {
		self.produto.enderecos.push({})
	}

	self.salvarGeral = function() {
		console.log('aqui',self.produto)	
	}

	self.consultarCientes = function() {
		$http.get(`${host}/${$stateParams.id}`)
		.then( ( obj ) => {
			const { result } =  obj.data
			
			self.produto = result.produto
			self.grupo = result.grupo
			self.subgrupo = result.subgrupo
			console.log(self.produto)
		

		})
		.catch((error) => {
			console.log(error)
		})
	}

	self.salvarAtualizar = () => {
		
		
		if (Object.keys(self.produto.enderecos[0]).length  == 1 &&  self.produto.enderecos[0].$$hashKey) {
			delete self.produto.enderecos;
		}

		if (Object.keys(self.produto.telefones[0]).length == 1 &&  self.produto.telefones[0].$$hashKey) {
			delete self.produto.telefones;
		}

		self.produto.data_nascimento = backDate(self.produto.data_nascimento)
		self.produto.data_fundacao = backDate(self.produto.data_fundacao)
		switch ('id' in $stateParams) {
			case true:
				$http.put(`${host}/`, self.produto)
					.then((result) => {
						$state.go('home', {id: result.data.id});
							// $window.location.reload();
							// self.init()
					}).catch( error => {
						console.log('apos salvar', error)
						self.produto.data_nascimento = frontDate(self.produto.data_nascimento)
						self.produto.data_fundacao = frontDate(self.produto.data_fundacao)
				})
				break
			case false:
				$http.post(`${host}`, self.produto)
					.then((result) => {
						console.log(result)
						$state.go('editar_produto', {id: result.data.id});
					}).catch( error => {
							self.produto.data_nascimento = frontDate(self.produto.data_nascimento)
							self.produto.data_fundacao = frontDate(self.produto.data_fundacao)
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