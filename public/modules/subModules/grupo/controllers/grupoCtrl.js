angular.module('grupoCtrl', ['grupoService'])
.controller('grupoCtrl', ['$http',
	'$stateParams',
	'$state',
	'configURL',
	'AppService',
	function($http, $stateParams, $state, configURL, AppService ) {
	
	const { baseURL } = configURL
	const host = `${baseURL}/grupo`

	self = this

	self.init = function() {
		switch ("id" in $stateParams) {
			case true:
				self.consultarGrupo()
				break
			default:
				console.log('testando...')
			}
	}

	self.consultarGrupo = function() {
		$http.get(`${host}/${$stateParams.id}`)
		.then( ( obj ) => {
			self.grupo =  obj.data.dados
			
		})
		.catch((error) => {
			AppService.notificacao(null, null)

		})
	}

	self.cancelar = function() {
		$state.go('grupos');
	}

	self.salvarAtualizar = () => {

		switch ("id" in $stateParams && $stateParams.id != '' ) {
			case true:				
					const result  = $http.put(`${host}/`, self.grupo)
					.then((result =>{						
						$state.go('grupos', {id: result.data.id})
						const { mensagem } = result.data
						AppService.notificacao(result.status, mensagem )
					}))
					.catch ((error)=> {
						AppService.notificacao(null, null )
					})
				break
			case false:
				$http.post(`${host}`, self.grupo)
					.then((result) => {
						$state.go('grupos');
						const {mensagem} = result.data 
						AppService.notificacao(result.status, mensagem )
					}).catch( error => {

						AppService.notificacao(null, null)
				})
		}
	}
	self.init()
}]);