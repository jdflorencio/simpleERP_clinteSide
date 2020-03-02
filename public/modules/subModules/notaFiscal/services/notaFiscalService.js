angular.module('notaFiscalService', [])
.factory('NotaFiscal', function($http, configURL, $stateParams, $state, ngNotify) {

    const { baseURL } = configURL
    const host = `${baseURL}/notaFiscal`    
    const NotaFiscalFactory = {}
    const message = ':( Houve um error Inesperado '
	const type = 'error'

	NotaFiscalFactory.consultarNotaFiscal = function() {
        try {
            return $http.get(`${host}/${$stateParams.id}`)
        } catch (error) {
            console.warn("Erro buscar pela nota ", error)
        }
    }

    NotaFiscalFactory.atualizar = function() {
       return  $http.put(`${host}/`, self.notaFiscal)
        .then((result =>{						
            $state.go('notasfiscais', {id: result.data.id});
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

    NotaFiscalFactory.querySearch = function(query, the) {

        const urls = {
            cliente : "clientefilter",
            produto : "produtofilter"
        }

		if (query.length > 2) {
            return $http.get(`${baseURL}/${urls[the]}/${query}`).then( res => {
                return res.data.result
            })
            .catch( error  => {
                console.erros(error)
            })
        }
        return []
      }      

    return NotaFiscalFactory;
});