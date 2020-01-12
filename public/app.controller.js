angular.module('appCtrl', [])
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
			cards: {
				title: "Cards",
				href: "/cards"
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

})
