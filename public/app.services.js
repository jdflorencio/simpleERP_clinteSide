angular.module('appService', [])
.factory('AppService', ['$state', 'ngNotify', function( $state, ngNotify ){
    const appService = {}

    appService.notificacao = function(resp, message) {

        switch(resp) {
            case 200:
                
                ngNotify.set(` ${message} :)`, {
                    type: 'success',
                    theme: 'pastel'
                });
                break
            case 201: 
            case 401:
                ngNotify.set(`${message}`, {
                    type: 'error',
                });
                break
            case 403:
                ngNotify.set(`${message}`, {
                    type: 'warn',
                });
                break
            case 412:
                ngNotify.set(`Erro inesperado :(`, {
                    type: 'warn',
                });
                break
            case 204:
            default:                
                ngNotify.set(`Erro inesperado :(`, {
                    type: 'error',
                });
        }
    }

    appService.notAuthenticated =  function() {
        if (localStorage.getItem('Authorization')) {             
            $state.go('login')
        }
    }

    return appService

}])