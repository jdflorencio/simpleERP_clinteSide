var materialApp = angular
.module('materialApp', [
    'materialApp.routes',
    'ui.router',
    'ngMaterial',
    'appCtrl',
    'cardsCtrl',
    'cardsService',
    'listCtrl',
    'listService',
    'tabsCtrl',
    'tabsService',
    'clientesCtrl',
    'clientesService',
    'clienteCtrl',
    'clienteService'

]).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('pink');
});



