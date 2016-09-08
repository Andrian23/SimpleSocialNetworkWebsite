angular
    .module('app')
    .factory('AuthenticationService', AuthenticationService);

AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService'];

function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UserService) {
    var service = {};

    service.Login = function Login(username, password, callback) {

   
        $timeout(function () {
            var response;
            UserService.GetByUsername(username)
                .then(function (user) {
                    if (user !== null && user.password === password) {
                        response = {
                            success: true
                        };
                    } else {
                        response = {
                            success: false
                            , message: 'Username or password is incorrect'
                        };
                    }
                    callback(response);
                });
        }, 1000);

       

    };





   

    service.SetCredentials = function SetCredentials(username, password) {
        var authdata = username + ':' + password;

        $rootScope.globals = {
            currentUser: {
                username: username
                , authdata: authdata
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