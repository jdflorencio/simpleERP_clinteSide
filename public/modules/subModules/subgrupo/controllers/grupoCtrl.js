angular.module('subgrupoCtrl', ['subgrupoService'])
.controller('subgrupoCtrl', ['$http',
	'$stateParams',
	'$state',
	'configURL',
	'ngNotify',
	function($http, $stateParams, $state, configURL, ngNotify ) {
	
	const { baseURL } = configURL
	const host = `${baseURL}/subgrupo`

	self = this

	self.init = function() {
		switch ("id" in $stateParams) {
			case true:
				self.consultarSubgrupo()
				break
			default:
				console.log('testando...')
			}
	}

	self.consultarSubgrupo = function() {
		$http.get(`${host}/${$stateParams.id}`)
		.then( ( obj ) => {
			self.subgrupo =  obj.data.result
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
		$state.go('subgrupos');
	}

	self.salvarAtualizar = () => {

		let message = ':( Houve um error Inesperado '
		let type = 'error'
		switch ("id" in $stateParams && $stateParams.id != '' ) {
			case true:				
					const result  = $http.put(`${host}/`, self.subgrupo)
					.then((result =>{						
						$state.go('subgrupos', {id: result.data.id});
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
				$http.post(`${host}`, self.subgrupo)
					.then((result) => {
						$state.go('subgrupos');
						let msg = result.data.sucesso ? result.data.msg : result.data.error.message
						ngNotify.set(`${msg}`, {type:'info',  theme: 'pastel'});
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