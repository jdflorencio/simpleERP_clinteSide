angular.module('subgrupoCtrl', ['subgrupoService'])
	.controller('subgrupoCtrl', ['$http',
		'$stateParams',
		'$state',
		'configURL',
		'AppService',
		function ($http, $stateParams, $state, configURL, AppService) {

			const { baseURL } = configURL
			const host = `${baseURL}/subgrupo`

			self = this
			self.init = function () {
				switch ("id" in $stateParams) {
					case true:
						self.consultarSubgrupo()
						break
					default:
						console.log('testando...')
				}

				$http.get(`${baseURL}/grupo`)
					.then((req) => {
						self.grupos = req.data.dados
					})
			}

			self.consultarSubgrupo = function () {
				$http.get(`${host}/${$stateParams.id}`)
					.then((obj) => {
						self.subgrupo = obj.data.dados
					})
					.catch((error) => {
						AppService.notificacao(null, null)
					})
			}

			self.cancelar = function () {
				$state.go('subgrupos');
			}

			self.salvarAtualizar = () => {

				switch ("id" in $stateParams && $stateParams.id != '') {
					case true:
						$http.put(`${host}/`, self.subgrupo)
							.then((result => {

								$state.go('subgrupos', { id: result.data.id })
								const { mensagem } = result.data
								AppService.notificacao(result.status, mensagem)
							}))
							.catch(() => {
								AppService.notificacao(null, null)
							})
						break
					case false:
						$http.post(`${host}`, self.subgrupo)
							.then((result) => {
								$state.go('subgrupos')
								const { mensagem } = result.data
								AppService.notificacao(result.status, mensagem)

							}).catch(() => {
								AppService.notificacao(null, null)
							})
				}
			}
			self.init()
		}]);