var materialApp = angular
.module('materialApp', [
    'materialApp.routes',
    'ui.router',
    'ngMaterial',
    'appCtrl',
    'clientesCtrl',
    'clientesService',
    'clienteCtrl',
    'clienteService',
    
    'produtosCtrl',
    'produtosService',
    'produtoCtrl',
    'produtoService'

]).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('pink');
});



