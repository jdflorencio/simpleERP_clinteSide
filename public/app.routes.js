var router = angular.module('materialApp.routes', ['ui.router']);
router.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    // UI Router States
    // Inserting Page title as State Param
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'home.html',
            params: {
                title: "Material Starter"
            }
        })
        .state('cards', {
            url: '/cards',
            templateUrl: '/modules/cards/views/cards.html',
            controller: 'cardsCtrl',
            controllerAs: 'Cards',
            params: {
                title: "Cards"
            }
        })
        .state('list', {
            url: '/list',
            templateUrl: '/modules/list/views/list.html',
            controller: 'listCtrl',
            controllerAs: 'List',
            params: {
                title: "List"
            }
        })
        .state('tabs', {
            url: '/tabs',
            templateUrl: '/modules/tabs/views/tabs.html',
            controller: 'tabsCtrl',
            controllerAs: 'Tabs',
            params: {
                title: "Tabs"
            }
        })
        .state('clientes', {
            url: '/clientes',
            templateUrl: '/modules/clientes/views/clientes.html',
            controller: 'clientesCtrl',
            controllerAs: 'Clientes',
            params: {
                title: "Clientes"
            }
        })
        .state('cliente', {
            url: '/clientes/add',
            templateUrl: '/modules/subModules/cliente/views/cliente.html',
            controller: 'clienteCtrl',
            controllerAs: 'Cliente',
            params: {
                title: "Adicionar clientes"
            }
        })
        ;

    $locationProvider.html5Mode(true);

});