angular
    .module('app')
    .factory('AuthenticationService', AuthenticationService);

AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService'];

function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UserService) {
    var service = {};

    service.Login = function Login(user_login, password, callback) {
        var response;
        UserService.GetByUsername(user_login)
            .then(function (user) {
                if (user !== null && user.user_pass === password) {
                    response = {
                        success: true
                        , user: user
                    };
                } else {
                    response = {
                        success: false
                    };
                }
                callback(response);
            });



    };
    service.SetCredentials = function SetCredentials(user) {
        $rootScope.globals = {
            currentUser: {
                username: user.user_name
                , user: user
            }
        };


        $cookieStore.put('globals', $rootScope.globals);
    };



    service.ClearCredentials = function ClearCredentials() {
        $rootScope.globals = {};
        $cookieStore.remove('globals');
        $http.defaults.headers.common.Authorization = 'Basic';
    }



    return service;
}