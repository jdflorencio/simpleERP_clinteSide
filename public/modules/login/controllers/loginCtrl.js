angular.module('loginCtrl', ['loginService'])
.controller('loginCtrl', ['configURL', '$http', '$state',  function( configURL, $http, $state) {
	
	self = this;
	self.usuario = 'jdflorencio@gmail.com'
	self.password = '123456'

	
	// $httpProvider.interceptors.push()

	self.conectar = function(){
		$http.post(`${configURL.baseURL}/login`, {usuario: self.usuario, senha : self.password})
		.then( res => {
			if (res.status == 200) {
				localStorage.setItem("Authorization", res.data.dados); 
				$state.go('home')

			}
		})
	}
}]);