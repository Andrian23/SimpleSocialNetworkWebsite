

angular
    .module('app')
    .controller('LoginController', LoginController);

LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];

function LoginController($location, AuthenticationService, FlashService) {
    var vm = this;

    vm.login = function login() {  
        vm.dataLoading = true;
        AuthenticationService.Login(vm.username, vm.password, function (response) {  
            if (response.success) {
                AuthenticationService.SetCredentials(vm.username, vm.password);    
                $location.path('/');  
            } else {
                vm.dataLoading = false;   
            }
        });
    };;

    (function initController() {
        AuthenticationService.ClearCredentials();  
    })();

    
}