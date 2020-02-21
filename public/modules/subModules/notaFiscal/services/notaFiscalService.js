angular.module('notaFiscalService', [])
.factory('NotaFiscal', function($http, configURL, $stateParams, $state, ngNotify) {

    const { baseURL } = configURL
    const host = `${baseURL}/notaFiscal`    
    const NotaFiscalFactory = {}
    
	NotaFiscalFactory.consultarNotaFiscal = function() {
		$http.get(`${host}/${$stateParams.id}`)
		.then( ( obj ) => {
			const { result } =  obj.data
			self.notaFiscal = result
		})
		.catch((error) => {
			console.log(error)
		})
    }

    NotaFiscalFactory.atualizar = function() {
       return  $http.put(`${host}/`, self.notaFiscal)
        .then((result =>{						
            $state.go('notaFiscal', {id: result.data.id});
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
    }

    NotaFiscalFactory.salvar =  function() {
        return $http.post(`${host}`, self.notaFiscal)
					.then((result) => {
						$state.go('notaFiscals');
						let msg = result.data.sucesso ? result.data.msg : result.data.error.message
						ngNotify.set(`${msg}`, {type:'info',  theme: 'pastel'});
					}).catch( error => {
						ngNotify.set(`${message}`, {
							type: type,
							theme: 'pastel'
						})
				})
    }

    return NotaFiscalFactory;

});