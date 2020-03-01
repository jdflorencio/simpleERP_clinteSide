angular.module('notasFiscaisService', [])
.factory('NotasFiscais', function($http, configURL) {
    
    var notasFiscaisFactory = {};

    notasFiscaisFactory.getAll =  function(){
       
        return $http.get(`${configURL.baseURL}/notafiscal`)
        .then(all => {
            self.notas = all.data.result
            
        })
        .catch(error => {
            console.warn('erro ==>>', error )
        })
    }

    notasFiscaisFactory.deletar = function(notaId) {
        return $http.delete(`${configURL.baseURL}/notafiscal/${notaId}`)
        .then(all => {
            self.notas = all.data.result
            notasFiscaisFactory.getAll()
        })
        .catch( error => {
            console.log(error)
        })
    }

    return notasFiscaisFactory;

});