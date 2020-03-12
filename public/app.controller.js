angular.module('appCtrl',['appService'])
.controller('appCtrl',[ '$mdSidenav', '$stateParams','$rootScope','AppService', 

function($mdSidenav, $stateParams, $rootScope, AppService) {

	self = this;
	// console.log(AppService.notificacao(401))

	// $httpProvider.interceptors.push()

    self.siderbar = {
			home: {
				title: "Home",
				href: "/"
			},
			Cliente: {
				title: "Cliente",
				href: "/clientes"
			},
			Produtos: {
				title: "Produto",
				href: "/produtos"
			},
			notasFiscais: {
				title: "Notas Fiscais",
				href: "/notasfiscais"
			}		
		}

    // Update title using rootscope
    self.updateTitle = function() {
        $rootScope.title = $stateParams.title;
    }

    // Run updateTitle on each state change
    $rootScope.$on('$stateChangeSuccess', self.updateTitle);

	self.toggleLeft = function() {
    	$mdSidenav('left').toggle();
    }

    self.toggleRight = function() {
    	$mdSidenav('right').toggle();
	}

	self.doTheBack = function() {
		window.history.back();
	};

	self.logged = function(){
		if(!localStorage.getItem("Authorization") ) {
			return false
	  
		  }
		  return true
	}

}])
.constant("configURL", {
	baseURL: "http://127.0.0.1:3333/api"
})
