
angular.module('produtoCtrl', ['produtoService'])
	.controller('produtoCtrl', [

		'$http',
		'$stateParams',
		'$state',
		'configURL',
		'ngNotify',
		'$scope',
		'ProdutoService',
		'AppService',

		function ($http, $stateParams, $state, configURL, ngNotify, $scope, ProdutoService, AppService) {

			self = this
			self.produto
			const { baseURL } = configURL
			const host = `${baseURL}/produto`
			ProdutoService.tributos()

			self.init = function () {
				switch ("id" in $stateParams) {
					case true:
						self.consultarProduto()
						break
					default:
						self.produto = {
							estoque_minimo: 0,
							estoque_maximo: 0,
							estoque_atual: 0,
							vl_custo: 0,
							vl_venda: 0
						}
				}
			}

			self.salvarGeral = function () {
				console.log('aqui', self.produto)
			}

			self.consultarProduto = function () {
				$http.get(`${host}/${$stateParams.id}`)
					.then((obj) => {

						const { dados } = obj.data
						self.produto = dados.produto
						self.grupo = dados.grupo
						self.subgrupo = dados.subgrupo
					})
					.catch((error) => {
						
						AppService.notificacao(null, null)
					})
			}

			self.cancelar = function () {
				$state.go('produtos');
			}

			self.salvarAtualizar = () => {
			
				switch ("id" in $stateParams && $stateParams.id != '') {
					case true:
						const result = $http.put(`${host}/`, self.produto)
							.then((result => {
								const  { mensagem } = result.data
								$state.go('produtos', { id: result.data.id });
								AppService.notificacao(result.status, mensagem)
							}))
							.catch((error) => {
								AppService.notificacao(null, null)
							})

						break
					case false:
						$http.post(`${host}`, self.produto)
							.then((result) => {
								const { mensagem } = result.data
								$state.go('produtos')
								AppService.notificacao(result.status, mensagem)
							}).catch( error => {
								AppService.notificacao(null, null)
							})
				}
			}
			self.init()
		}]);