angular.module('grupoCtrl', ['grupoService'])
.controller('grupoCtrl', ['$http',
	'$stateParams',
	'$state',
	'configURL',
	'ngNotify',
	function($http, $stateParams, $state, configURL, ngNotify ) {
	
	const { baseURL } = configURL
	const host = `${baseURL}/grupo`

	self = this

	self.init = function() {
		switch ("id" in $stateParams) {
			case true:
				self.consultarGrupo()
				break
			default:
				self.grupo = {
				estoque_minimo: 0,
				estoque_maximo: 0,
				estoque_atual : 0,
				vl_custo: 0,
				vl_venda: 0
				}
			}
	}

	self.salvarGeral = function() {
		console.log('aqui',self.grupo)	
	}

	self.consultarGrupo = function() {
		$http.get(`${host}/${$stateParams.id}`)
		.then( ( obj ) => {
			const { result } =  obj.data
			self.grupo = result.grupo
			self.grupo = result.grupo
			self.subgrupo = result.subgrupo
		})
		.catch((error) => {
			console.log(error)
		})
	}

	self.cancelar = function() {
		$state.go('grupos');
	}

	self.salvarAtualizar = () => {

		let message = ':( Houve um error Inesperado '
		let type = 'error'
		switch ("id" in $stateParams && $stateParams.id != '' ) {
			case true:				
					const result  = $http.put(`${host}/`, self.grupo)
					.then((result =>{						
						$state.go('grupos', {id: result.data.id});
						let msg = result.data.sucesso ? result.data.msg :data.error.message
						ngNotify.set(`${msg}`, {
							type:'info'
						});
					}))
					.catch ((error)=> {
						
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
				$http.post(`${host}`, self.grupo)
					.then((result) => {
						$state.go('grupos');
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