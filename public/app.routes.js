var router = angular.module('materialApp.routes', ['ui.router']);
router.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $injector) {

    $urlRouterProvider.otherwise('/login');

    $httpProvider.interceptors.push(($injector) => {
        return {
          request: function (req) {
            req.headers.Authorization = 'Bearer ' +  localStorage.getItem("Authorization")
            return req
          },
          responseError: function (error) {
            
            if (error.status == 401) {
                localStorage.removeItem('Authorization')
                var state = $injector.get('$state')
                console.log(state)
                state.go('login')
            }
             return false
          },
          requestError: function(err) {
            console.warn(" ||| aqui >>>", err)
          }
        }

      })

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/modules/login/views/login.html',
            controller: 'loginCtrl',
            controllerAs: 'ctrl',
            params: {
                title: "SimpleERP"
            }, 
            resolve: {
                skipIfAuthenticated: function(AppService) {                                 
                teste = AppService.notAuthenticated()                
                
            }
        }
        })
        .state('home', {
            url: '/',
            templateUrl: 'home.html',
            params: {
                title: "SimpleERP"
            },
            resolve: {
                redirectIfNotAuthenticated: _redirectIfNotAuthenticated        
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
        }).state('notasfiscais', {
            url: '/notasfiscais',
            templateUrl: '/modules/notasFiscais/views/notasFiscais.html',
            controller: 'notasFiscaisCtrl',
            controllerAs: 'ctrl',
            params: {
                title: "Notas Fiscais"
            }
        })
        .state('adicionar_nota_fiscal', {
            url: '/notafiscal/add',
            templateUrl: '/modules/subModules/notaFiscal/views/notaFiscal.html',
            controller: 'notaFiscalCtrl',
            controllerAs: 'ctrl',
            params: {
                title: "Adicionando uma nova nota Fiscal"
            }
        })
        .state('editar_nota_fiscal', {
            url: '/notafiscal/:id',
            templateUrl: '/modules/subModules/notaFiscal/views/notaFiscal.html',
            controller: 'notaFiscalCtrl',
            controllerAs: 'ctrl',
            params: {
                title: "Editando a nota Fiscal"
            }
        })
    $locationProvider.html5Mode(true);
});


function _skipIfAuthenticated() {
    
}

function _redirectIfNotAuthenticated() {
    console.log('Não Autenticado')
}

