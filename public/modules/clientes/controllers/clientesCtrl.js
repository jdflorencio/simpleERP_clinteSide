angular.module('clientesCtrl', ['clientesService'])
	.controller('clientesCtrl', ['$http', '$state', '$filter', 'AppService', function ($http, $state, $filter, AppService) {

		self = this;
		const host = `http://127.0.0.1:3333/api/cliente/`

		init = function () {
			$http.get(`${host}`)
				.then((obj) => {
					const { dados } = obj.data
					self.clientes = dados
				})
		}

		self.irCliente = function (clienteId) {
			$state.go('editar_cliente', { id: clienteId })
		}

		self.novoCliente = function () {
			$state.go('adicionar_cliente')
		}

		self.remover = function (id) {

			$http.delete(`${host}${id}`)
				.then(obj => {
					const { data } = obj
					AppService.notificacao(obj.status, data.mensagem)
					init()
				})
				.catch(error=> {
					AppService.notificacao(null, null)
				})
		}
		init()
	}])