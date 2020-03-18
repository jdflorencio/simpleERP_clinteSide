angular.module('tributoCtrl', ['tributoService'])
.controller('tributoCtrl', ['$http',
	'$stateParams',
	'$state',
	'configURL',
	'AppService',
	function($http, $stateParams, $state, configURL, AppService ) {
	console.info('configURL')
	const { baseURL } = configURL
	const host = `${baseURL}/tributacao`

	self = this
	self.init = function() {
		switch ("id" in $stateParams) {
			case true:
				self.consultarTributo()
				break
			default:
				console.log('testando...')
			}
	}

	self.consultarTributo = function() {
		$http.get(`${host}/${$stateParams.id}`)
		.then( ( obj ) => {
			self.tributo =  obj.data.dados
		})
		.catch((error) => {
			AppService.notificacao(null, null)
			
		})
	}

	self.cancelar = function() {
		$state.go('tributacao');
	}

	self.salvarAtualizar = () => {

		switch ("id" in $stateParams && $stateParams.id != '' ) {
			case true:				
					$http.put(`${host}/`, self.tributo)
					.then((result =>{						
						$state.go('tributacao')
						const { mensagem } = result.data
						AppService.notificacao(result.status, mensagem)
					}))
					.catch ((error)=> {
						AppService.notificacao(null, null)
					})
				break
			case false:
				$http.post(`${host}`, self.tributo)
					.then((result) => {
						const { mensagem, dados } = result.data
						AppService.notificacao(result.status, mensagem)
						console.log(dados)

						$state.go('editar_tributo', {id: dados.id})
					}).catch( error => {
						AppService.notificacao(null, null)
				})
		}
	}
	self.init()
}]);