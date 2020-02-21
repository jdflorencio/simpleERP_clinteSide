angular.module('notaFiscalService', [])
.factory('NotaFiscal', function($http, configURL, $stateParams) {

    const { baseURL } = configURL
    const host = `${baseURL}/notaFiscal`    
    const NotaFiscalFactory = {};
   
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

    return NotaFiscalFactory;

});