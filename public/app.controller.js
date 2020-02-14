angular.module('appCtrl',[])
.controller('appCtrl', function($mdSidenav, $stateParams, $rootScope) {

    self = this;

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

})
.constant("configURL", {
	baseURL: "http://127.0.0.1:3333/api"
})