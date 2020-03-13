angular.module('appService', [])
.factory('AppService', ['$state', function( $state ){
    const appService = {}

    appService.notificacao = function(resp) {
        console.log(resp)
        switch(resp) {
            case 200:
                console.log("Autenticando!")
                break
            case 201: 
            case 401:
                numero = 401
                console.log('Erro na autenticaçãao')
                $state.go('login')
                break

            default:
                console.warn('não foi possivel fazer a requisição')
        }
    }

    appService.notAuthenticated =  function() {
        if (localStorage.getItem('Authorization')) {             
            $state.go('login')
        }
    }

    return appService

}])