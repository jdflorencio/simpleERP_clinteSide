var router = angular.module('materialApp.routes', ['ui.router']);
router.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    // UI Router States
    // Inserting Page title as State Param
    $stateProvider
        .state('homex', {
            url: '/homex',
            templateUrl: 'home.html',
            params: {
                title: "SimpleERP"
            }
        })
        .state('cards', {
            url: '/cards',
            templateUrl: '/modules/cards/views/cards.html',
            controller: 'cardsCtrl',
            controllerAs: 'ctrl',
            params: {
                title: "Cards"
            }
        })
        .state('list', {
            url: '/list',
            templateUrl: '/modules/list/views/list.html',
            controller: 'listCtrl',
            controllerAs: 'ctrl',
            params: {
                title: "List"   
            }
        })
        .state('tabs', {
            url: '/tabs',
            templateUrl: '/modules/tabs/views/tabs.html',
            controller: 'tabsCtrl',
            controllerAs: 'ctrl',
            params: {
                title: "Tabs"
            }
        })
        .state('home', {
            url: '/',
            templateUrl: '/modules/clientes/views/clientes.html',
            controller: 'clientesCtrl',
            controllerAs: 'ctrl',
            params: {
                title: "Clientes"
            }
        })
        .state('adicionar_cliente', {
            url: '/cliente/add',
            templateUrl: '/modules/subModules/cliente/views/cliente.html',
            controller: 'clienteCtrl',
            controllerAs: 'ctrl',
            params: {
                title: "Adicionar novo clientes"
            }
        })
        .state('editar_cliente', {
            url: '/cliente/:id',
            templateUrl: '/modules/subModules/cliente/views/cliente.html',
            controller: 'clienteCtrl',
            controllerAs: 'ctrl',
            params: {
                title: "Editando cliente"
            }
        });

    $locationProvider.html5Mode(true);

});