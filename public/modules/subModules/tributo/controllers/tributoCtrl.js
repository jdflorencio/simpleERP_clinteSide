angular.module('tributoCtrl', ['tributoService'])
.controller('tributoCtrl', ['$http',
	'$stateParams',
	'$state',
	'configURL',
	'ngNotify',
	function($http, $stateParams, $state, configURL, ngNotify ) {
	
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
			self.tributo =  obj.data.result
		})
		.catch((error) => {
			if (error.data.error) {
				message = `${error.data.error.message} em (${error.data.error.error[0]})`
				type = 'warn'
			}		
			ngNotify.set(`${message}`, {
				type: type,
				theme: 'pastel'
			})
		})
	}

	self.cancelar = function() {
		$state.go('tributos');
	}

	self.salvarAtualizar = () => {

		let message = ':( Houve um error Inesperado '
		let type = 'error'
		switch ("id" in $stateParams && $stateParams.id != '' ) {
			case true:				
					$http.put(`${host}/`, self.tributo)
					.then((result =>{						
						$state.go('tributacao');
						let msg = result.data.sucesso ? result.data.msg :data.error.message
						ngNotify.set(`${msg}`, {
							type:'info'
						});
					}))
					.catch ((error)=> {
						console.log(error.data)
						if (error.data.error) {
							message = `${error.data.error.message} em (${error.data.error.error[0]})`
							type = 'warn'
						}		
						ngNotify.set(`${message}`, {
							type: type,
							theme: 'pastel'
						})
					})
				break
			case false:
				$http.post(`${host}`, self.tributo)
					.then((result) => {

						const { data } = result.data
						console.log(data)
						$state.go('editar_tributo', {id: data.id})
						
						let msg = result.data.sucesso ? result.data.msg : result.data.error.message
						ngNotify.set(`${msg}`, {type:'info',  theme: 'pastel'})
					}).catch( error => {
						ngNotify.set(`${message}`, {
							type: type,
							theme: 'pastel'
						})
				})
		}
	}
	self.init()
}]);