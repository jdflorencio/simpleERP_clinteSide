angular.module('notaFiscalService', [])
.factory('NotaFiscal', function($http, configURL, $stateParams, $state, AppService) {

    const { baseURL } = configURL
    const host = `${baseURL}/notaFiscal`    
    const NotaFiscalFactory = {}
    const message = ':( Houve um error Inesperado '
	const type = 'error'

	NotaFiscalFactory.consultarNotaFiscal = function() {
        try {
            return $http.get(`${host}/${$stateParams.id}`)
        } catch (error) {
            AppService.notificacao(null, null)
        }
    }

    NotaFiscalFactory.atualizar = function() {
       return  $http.put(`${host}/`, self.notaFiscal)
        .then((result =>{						
            $state.go('notasfiscais', {id: result.data.id});
            const { mensagem } = result.data
            AppService.notificacao(result.status, mensagem)
        }))
        .catch (()=> {
            AppService.notificacao(null, null)
        })
    }

    NotaFiscalFactory.salvar =  function() {
        return $http.post(`${host}`, self.notaFiscal)
        .then((result) => {
            $state.go('notaFiscals');
            const { mensagem } = result.data
            AppService.notificacao(result.status, mensagem)

        }).catch( () => {
            AppService.notificacao(null, null)
        })
    }

    NotaFiscalFactory.querySearch = function(query, the) {

        const urls = {
            cliente : "clientefilter",
            produto : "produtofilter"
        }

		if (query.length > 2) {
            return $http.get(`${baseURL}/${urls[the]}/${query}`).then( res => {
                return res.data.dados
            })
            .catch( error  => {
                
                AppService.notificacao(null, null)
                console.warn('<<< CONFIRA >>>', error)
            })
        }
        return []
      }      

    return NotaFiscalFactory;
});