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
    'ui.utils.masks',
    'produtosCtrl',
    'produtosService',
    'produtoCtrl',
    'produtoService',
    'gruposCtrl',
    'gruposService',
    'grupoCtrl',
    'gruposService',
    'ngNotify'

])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('red');
})
.factory('FormatToAPI', function(){
  
  return {
    dateFormat: function(date) {
      console.log(date)
        const formatoBrasileiro = RegExp('^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}$')
        const formatoIngles = RegExp('^[12][0-9]{3}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$')
        if( formatoBrasileiro.test(date)){
            return date.split('/').reverse().join('-')
        } else if( formatoIngles.test(date)) {
            return date.split('-').reverse().join('/')
        }
      }
  }
})


