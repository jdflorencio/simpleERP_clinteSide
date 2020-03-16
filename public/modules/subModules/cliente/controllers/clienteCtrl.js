angular.module('clienteCtrl', ['clienteService'])
	.controller('clienteCtrl', [
		'$http',
		'$stateParams',
		'$state',
		'$filter',
		'configURL',
		'FormatToAPI',
		'AppService',
		function ($http, $stateParams, $state, $filter, configURL, FormatToAPI, AppService) {

			const { baseURL } = configURL
			const host = 'http://127.0.0.1:3333/api/cliente'
			self = this

			self.tipoFormulario = {
				ativo: true
			}

			frontDate = function (date) {
				date = date != null ? date.split('-').reverse().join('/') : null
				return date
			}

			backDate = function (date) {
				date = date != null ? date.split('/').reverse().join('-') : null
				return date
			}

			self.init = function () {

				switch ("id" in $stateParams) {
					case true:
						self.consultarCientes()

						break
					case false:
						self.cliente = { tipo: 'pf', sexo: 'masculino', enderecos: [{}], telefones: [{}] }
				}
			}

			self.removerTelefone = async function (index) {
				self.cliente.telefones.splice(index, 1);

				if (self.cliente.telefones.length === 0) {
					self.addTelefone();
				}
			}

			self.addTelefone = function () {
				self.cliente.telefones.push({})
			}

			self.removerEndereco = function (index) {
				self.cliente.enderecos.splice(index, 1);
				if (self.cliente.enderecos.length === 0) {
					self.addEndereco();
				}
			}

			self.addEndereco = function () {
				self.cliente.enderecos.push({})
			}

			self.salvarGeral = function () {
				console.log('aqui', self.cliente)
			}

			self.consultarCientes = function () {
				$http.get(`${host}/${$stateParams.id}`)
					.then((obj) => {

						const { dados } = obj.data
						self.cliente = dados
						self.cliente.data_nascimento = self.cliente.data_nascimento != null ? $filter('date')(self.cliente.data_nascimento, 'dd/MM/yyyy') : ''
						self.cliente.data_fundacao = self.cliente.data_fundacao != null ? $filter('date')(self.cliente.data_fundacao, 'dd/MM/yyyy') : null

						self.cliente.enderecos = self.cliente.enderecos.length > 0 ? self.cliente.enderecos : new Array({})
						self.cliente.telefones = self.cliente.telefones.length > 0 ? self.cliente.telefones : new Array({})
					})
					.catch((error) => {
						AppService.notificacao(error.state, error.mensagem)
					})
			}

			self.salvarAtualizar = () => {

				if (self.cliente["enderecos"][0].length == 1 && typeof self.cliente.enderecos != "undefined") {
					delete self.cliente.enderecos;

					if (self.cliente["telefones"][0].length == 1 && self.cliente.telefones) {
						delete self.cliente.telefones;
					}
				}
				self.cliente.data_nascimento = self.cliente.data_nascimento ? FormatToAPI.dateFormat(self.cliente.data_nascimento) : null
				self.cliente.data_fundacao = self.cliente.data_fundacao ? FormatToAPI.dateFormat(self.cliente.data_fundacao) : null

				switch ('id' in $stateParams) {
					case true:
						$http.put(`${host}/`, self.cliente)
							.then((result) => {
								AppService.notificacao(result.status, result.data.mensagem)
								$state.go('clientes');
							}).catch(error => {								
								AppService.notificacao(null,null)
							})
						break
					case false:
						$http.post(`${host}`, self.cliente)
							.then((result) => {
								const { dados } = result.data
								$state.go('editar_cliente', { id: dados.id });
								AppService.notificacao(result.status, result.data.mensagem)

							}).catch(error => {
								AppService.notificacao(null,null)
							})
				}
			}

			self.delete = (table, id_registro) => {

				$http.delete(`${host}/${$stateParams.id}/${table}/${id_registro}`)
					.then(result => {
						AppService.notificacao(result.state, result.data.mensagem)
					})
					.catch( error => { 
						AppService.notificacao(null,null)

					})
			}

			self.init()
		}
	])