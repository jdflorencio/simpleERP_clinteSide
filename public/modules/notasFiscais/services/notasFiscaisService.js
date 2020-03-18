angular.module('notasFiscaisService', [])
.factory('NotasFiscais',  function($http, configURL, AppService) {
    
    var notasFiscaisFactory = {};

    notasFiscaisFactory.getAll =  function(pagina = 1) {
       
        return $http.get(`${configURL.baseURL}/notafiscal`, {
            params: { pagina: pagina }
        })
        .then( all => {
            self.notas = all.data.dados.rows
            self.quantidade_registro = function() {
                const val = []
                for (let i = 0; i <  Math.ceil((all.data.dados.count)/4); i++ ) {
                    val.push(i+1)
                }
                return val
            }
            // Math.ceil((all.data.result.count)/3)            
        })
        .catch(error => {
            console.warn('erro ==>>', error )
        })
    }

    notasFiscaisFactory.deletar = function(notaId) {
        return $http.delete(`${configURL.baseURL}/notafiscal/${notaId}`)
        .then( all => {
            const { mensagem } = all.data
            notasFiscaisFactory.getAll()
            AppService.notificacao(all.status, mensagem)

        })
        .catch( error => {
            AppService.notificacao(error.status, error.data.mensagem)
        })
    }

    return notasFiscaisFactory

});