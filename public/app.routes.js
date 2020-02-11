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
                title: "SimpleERP"
            }
        })
        .state('clientes', {
            url: '/clientes',
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
        })
        .state('produtos', {
            url: '/produtos',
            templateUrl: '/modules/produtos/views/produtos.html',
            controller: 'produtosCtrl',
            controllerAs: 'ctrl',
            params: {
                title: "Produtos"
            }
        })
        .state('adicionar_produtos', {
            url: '/produto/add',
            templateUrl: '/modules/subModules/produto/views/produto.html',
            controller: 'produtoCtrl',
            controllerAs: 'ctrl',
            params: {
                title: "Adicionar novo produtos"
            }
        })
        .state('editar_produto', {
            url: '/produto/:id',
            templateUrl: '/modules/subModules/produto/views/produto.html',
            controller: 'produtoCtrl',
            controllerAs: 'ctrl',
            params: {
                title: "Editando produto"
            }
        });

    $locationProvider.html5Mode(true);

});