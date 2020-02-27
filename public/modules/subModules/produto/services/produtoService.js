angular.module('produtoService', [])
.factory('ProdutoService', function($http, configURL) {

    self = this	
	const { baseURL } = configURL
	const host = `${baseURL}/tributacao`
    
    const produtoFactory = {};

    produtoFactory.tributos = function() {
         $http.get(`${host}`)
        .then( tributacao => {
            self.tributacao =  tributacao.data.result
        })
        .catch( error => {            
            console.log( error )
        })
    }

    return produtoFactory;

})