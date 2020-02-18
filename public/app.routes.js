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
        .state('adicionar_produto', {
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
        })
        .state('grupos', {
            url: '/grupos',
            templateUrl: '/modules/grupos/views/grupos.html',
            controller: 'gruposCtrl',
            controllerAs: 'ctrl',
            params: {
                title: "grupos"
            }
        })
        .state('adicionar_grupo', {
            url: '/grupo/add',
            templateUrl: '/modules/subModules/grupo/views/grupo.html',
            controller: 'grupoCtrl',
            controllerAs: 'ctrl',
            params: {
                title: "Adicionar novo grupos"
            }
        })
        .state('editar_grupo', {
            url: '/grupo/:id',
            templateUrl: '/modules/subModules/grupo/views/grupo.html',
            controller: 'grupoCtrl',
            controllerAs: 'ctrl',
            params: {
                title: "Editando grupo"
            }
        })
        .state('subgrupos', {
            url: '/subgrupos',
            templateUrl: '/modules/subgrupos/views/subgrupos.html',
            controller: 'subgruposCtrl',
            controllerAs: 'ctrl',
            params: {
                title: "subgrupos"
            }
        })
        .state('adicionar_subgrupo', {
            url: '/subgrupo/add',
            templateUrl: '/modules/subModules/subgrupo/views/subgrupo.html',
            controller: 'subgrupoCtrl',
            controllerAs: 'ctrl',
            params: {
                title: "Adicionar novo subgrupos"
            }
        })
        .state('editar_subgrupo', {
            url: '/subgrupo/:id',
            templateUrl: '/modules/subModules/subgrupo/views/subgrupo.html',
            controller: 'subgrupoCtrl',
            controllerAs: 'ctrl',
            params: {
                title: "Editando subgrupo"
            }
        })
        .state('tributacao', {
            url: '/tributacao',
            templateUrl: '/modules/tributacao/views/tributacao.html',
            controller: 'tributacaoCtrl',
            controllerAs: 'ctrl',
            params: {
                title: "Tributacão"
            }
        })
        .state('adicionar_tributo', {
            url: '/tributo/add',
            templateUrl: '/modules/subModules/tributo/views/tributo.html',
            controller: 'tributoCtrl',
            controllerAs: 'ctrl',
            params: {
                title: "Adicionar novo tributos"
            }
        })
        .state('editar_tributo', {
            url: '/tributo/:id',
            templateUrl: '/modules/subModules/tributo/views/tributo.html',
            controller: 'tributoCtrl',
            controllerAs: 'ctrl',
            params: {
                title: "Editando tributo"
            }
        })


    $locationProvider.html5Mode(true);

});